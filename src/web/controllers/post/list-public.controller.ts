import { FastifyReply, FastifyRequest } from 'fastify'

import { PostContract } from '@/application/contracts'
import { ListPublicUseCase } from '@/application/usecases/post'

import { ResponseHandler } from '@/web/utils'
import { BaseError } from '@/application/errors'

export const listPublicController = (repository: PostContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const useCase = new ListPublicUseCase(repository)
      const found = await useCase.execute()
      return reply.send(found)
    } catch (error) {
      ResponseHandler.error(reply, error as BaseError)
    }
  }
}
