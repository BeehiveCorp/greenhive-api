import { FastifyReply, FastifyRequest } from 'fastify'

import { HeroContract } from '@/application/contracts'
import { ListHeroesUseCase } from '@/application/usecases/hero'

import { BaseError } from '@/application/errors'

import { ResponseHandler } from '@/web/utils'

export const listHeroesController = (repository: HeroContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const useCase = new ListHeroesUseCase(repository)
      const heroes = await useCase.execute()
      return reply.status(200).send(heroes)
    } catch (error) {
      ResponseHandler.error(reply, error as BaseError)
    }
  }
}
