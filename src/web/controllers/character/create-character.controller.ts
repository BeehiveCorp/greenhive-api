import { FastifyReply, FastifyRequest } from 'fastify'

import { Character } from '@/domain/models'

import { CharacterContract } from '@/application/contracts'
import { CreateCharacterUseCase } from '@/application/usecases/character'

import { ResponseHandler } from '@/web/utils'
import { InternalServerError } from '@/application/errors'

import { uploadFile } from '@/web/utils/upload-file'

export const createCharacterController = (repository: CharacterContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { data: character, fileName } = await uploadFile<Character>({
      DataClass: Character,
      folderName: 'character',
      parts: request.parts(),
    })

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
