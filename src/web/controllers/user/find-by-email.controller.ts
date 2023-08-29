import { FastifyReply, FastifyRequest } from 'fastify'

import { UserContract } from '@/application/contracts'
import { BaseError } from '@/application/errors'
import { FindByEmailUseCase } from '@/application/usecases/user'

import { ResponseHandler } from '@/web/utils'
import { User } from '@/domain/models'

export const findByEmailController = (repository: UserContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { email } = request.params as User

      const useCase = new FindByEmailUseCase(repository)

      const user = await useCase.execute(email)

      return reply.status(200).send(user)
    } catch (error) {
      ResponseHandler.error(reply, error as BaseError)
    }
  }
}
