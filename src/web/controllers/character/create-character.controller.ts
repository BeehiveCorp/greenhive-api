import { FastifyReply, FastifyRequest } from 'fastify'
import fs from 'fs'
import util from 'util'
import path from 'path'
import { pipeline } from 'stream'

import { Character } from '@/domain/models'

import { CharacterContract } from '@/application/contracts'
import { CreateCharacterUseCase } from '@/application/usecases/character'

import { ResponseHandler } from '@/web/utils'
import { InternalServerError } from '@/application/errors'

const pump = util.promisify(pipeline)

export const createCharacterController = (repository: CharacterContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const parts = request.parts()
    let character: Character | null = null
    let fileName: string | null = null

    for await (const part of parts) {
      if (part.type === 'file') {
        const root = path.join(__dirname, '../../../../')
        const folder = path.join(root, 'fake-s3', 'character')

        const timestamp = new Date().getTime()

        if (!fs.existsSync(folder)) {
          fs.mkdirSync(folder, { recursive: true })
        }

        fileName = `${timestamp}-${part.filename}`

        await pump(
          part.file,
          fs.createWriteStream(`./fake-s3/character/${fileName}`),
        )
      } else {
        const data = JSON.parse(part.value as string) as Character
        character = new Character(data)
      }
    }

    if (!character) {
      ResponseHandler.error(reply, new InternalServerError('Algo deu errado!'))
      return
    }

    character.avatar_url = `/fake-s3/character/${fileName}`

    const useCase = new CreateCharacterUseCase(repository)

    const created = await useCase.execute(character)

    return reply.send(created)
  }
}
