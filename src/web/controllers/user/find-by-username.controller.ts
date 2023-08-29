import { FastifyReply, FastifyRequest } from 'fastify'

import { UserContract } from '@/application/contracts'
import { BaseError } from '@/application/errors'
import { FindByUsernameUseCase } from '@/application/usecases/user'

import { ResponseHandler } from '@/web/utils'
import { User } from '@/domain/models'

export const findByUsernameController = (repository: UserContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { username } = request.params as User

      const useCase = new FindByUsernameUseCase(repository)

      const user = await useCase.execute(username)

      return reply.status(200).send(user)
    } catch (error) {
      ResponseHandler.error(reply, error as BaseError)
    }
  }
}
