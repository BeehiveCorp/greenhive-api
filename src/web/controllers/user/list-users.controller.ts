import { FastifyReply, FastifyRequest } from 'fastify'

import { UserContract } from '@/application/contracts'
import { ListUsersUseCase } from '@/application/usecases/user'

export const listUsersController = (prismaUserRepository: UserContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const listUsersUseCase = new ListUsersUseCase(prismaUserRepository)
    const users = await listUsersUseCase.execute()
    reply.status(200).send(users)
  }
}
