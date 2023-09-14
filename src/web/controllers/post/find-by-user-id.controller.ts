import { FastifyReply, FastifyRequest } from 'fastify'

import { PostContract, UserContract } from '@/application/contracts'
import { FindByUserIdUseCase } from '@/application/usecases/post'

import { ResponseHandler } from '@/web/utils'
import { BaseError } from '@/application/errors'

export const findByUserIdController = (
  postRepository: PostContract,
  userRepository: UserContract,
) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string }

      const useCase = new FindByUserIdUseCase(postRepository, userRepository)
      const found = await useCase.execute(id)
      return reply.send(found)
    } catch (error) {
      ResponseHandler.error(reply, error as BaseError)
    }
  }
}
