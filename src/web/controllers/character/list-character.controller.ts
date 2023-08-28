import { FastifyReply, FastifyRequest } from 'fastify'

import { CharacterContract } from '@/application/contracts'
import { ListCharactersUseCase } from '@/application/usecases/character'

import { BaseError } from '@/application/errors'

import { ResponseHandler } from '@/web/utils'

export const listCharactersController = (repository: CharacterContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const useCase = new ListCharactersUseCase(repository)
      const characters = await useCase.execute()
      return reply.status(200).send(characters)
    } catch (error) {
      ResponseHandler.error(reply, error as BaseError)
    }
  }
}
