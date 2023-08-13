import { FastifyReply, FastifyRequest } from 'fastify'

import { UserContract } from '@/application/contracts'
import { BaseError } from '@/application/errors'
import { ListUsersUseCase } from '@/application/usecases/user'

import { ResponseHandler } from '@/web/utils'

export const listUsersController = (prismaUserRepository: UserContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const listUsersUseCase = new ListUsersUseCase(prismaUserRepository)
      const users = await listUsersUseCase.execute()
      reply.status(200).send(users)
    } catch (error) {
      ResponseHandler.error(reply, error as BaseError)
    }
  }
}
