import { FastifyReply, FastifyRequest } from 'fastify'

import { PostContract } from '@/application/contracts'
import { ListCorporateUseCase } from '@/application/usecases/post'

import { ResponseHandler } from '@/web/utils'
import { BaseError } from '@/application/errors'

export const listCorporateController = (repository: PostContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string }

      const useCase = new ListCorporateUseCase(repository)
      const found = await useCase.execute(id)
      return reply.send(found)
    } catch (error) {
      ResponseHandler.error(reply, error as BaseError)
    }
  }
}
