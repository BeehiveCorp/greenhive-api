import { FastifyReply, FastifyRequest } from 'fastify'

import { CommentContract } from '@/application/contracts'
import { ListByPostIdUseCase } from '@/application/usecases/comment'

import { ResponseHandler } from '@/web/utils'
import { BaseError } from '@/application/errors'

export const listByPostController = (repository: CommentContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string }

      const useCase = new ListByPostIdUseCase(repository)
      const found = await useCase.execute(id)
      return reply.send(found)
    } catch (error) {
      ResponseHandler.error(reply, error as BaseError)
    }
  }
}
