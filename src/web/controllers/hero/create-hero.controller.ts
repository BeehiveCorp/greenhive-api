import { FastifyReply, FastifyRequest } from 'fastify'

import { Hero } from '@/domain/models'

import { HeroContract } from '@/application/contracts'
import { CreateHeroUseCase } from '@/application/usecases/hero'

import { ResponseHandler } from '@/web/utils'
import { InternalServerError } from '@/application/errors'

import { uploadFile } from '@/web/utils/upload-file'

export const createHeroController = (repository: HeroContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { data: hero, fileName } = await uploadFile<Hero>({
      DataClass: Hero,
      folderName: 'character',
      parts: request.parts(),
    })

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
