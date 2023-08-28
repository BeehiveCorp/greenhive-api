import { FastifyReply, FastifyRequest } from 'fastify'

import { DifficultyContract } from '@/application/contracts'
import { BaseError } from '@/application/errors'
import { ListDifficultiesUseCase } from '@/application/usecases/difficulty'

import { ResponseHandler } from '@/web/utils'

export const listDifficultiesController = (
  prismaDifficultyRepository: DifficultyContract,
) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const listDifficultiesUseCase = new ListDifficultiesUseCase(
        prismaDifficultyRepository,
      )

      const users = await listDifficultiesUseCase.execute()

      return reply.status(200).send(users)
    } catch (error) {
      ResponseHandler.error(reply, error as BaseError)
    }
  }
}
