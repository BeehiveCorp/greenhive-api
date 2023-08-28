import { FastifyReply, FastifyRequest } from 'fastify'
import fs from 'fs'
import util from 'util'
import path from 'path'
import { pipeline } from 'stream'

import { Hero } from '@/domain/models'

import { HeroContract } from '@/application/contracts'
import { CreateHeroUseCase } from '@/application/usecases/hero'

import { ResponseHandler } from '@/web/utils'
import { InternalServerError } from '@/application/errors'

const pump = util.promisify(pipeline)

export const createHeroController = (repository: HeroContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const parts = request.parts()
    let hero: Hero | null = null
    let fileName: string | null = null

    for await (const part of parts) {
      if (part.type === 'file') {
        const root = path.join(__dirname, '../../../../')
        const folder = path.join(root, 'fake-s3', 'hero')

        const timestamp = new Date().getTime()

        if (!fs.existsSync(folder)) {
          fs.mkdirSync(folder, { recursive: true })
        }

        fileName = `hero_${timestamp}-${part.filename}`

        await pump(
          part.file,
          fs.createWriteStream(`./fake-s3/hero/${fileName}`),
        )
      } else {
        const data = JSON.parse(part.value as string) as Hero
        hero = new Hero(data)
      }
    }

    if (!hero) {
      ResponseHandler.error(reply, new InternalServerError('Algo deu errado!'))
      return
    }

    hero.avatar_url = `/fake-s3/hero/${fileName}`

    const useCase = new CreateHeroUseCase(repository)

    const created = await useCase.execute(hero)

    return reply.send(created)
  }
}
