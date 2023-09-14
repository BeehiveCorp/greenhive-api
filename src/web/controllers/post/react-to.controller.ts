import { FastifyReply, FastifyRequest } from 'fastify'

import { PostContract } from '@/application/contracts'
import { ReactToUseCase } from '@/application/usecases/post'

import { ResponseHandler } from '@/web/utils'
import { BaseError } from '@/application/errors'

export const reactToController = (repository: PostContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string }

      const useCase = new ReactToUseCase(repository)
      await useCase.execute(id)
    } catch (error) {
      ResponseHandler.error(reply, error as BaseError)
    }
  }
}
