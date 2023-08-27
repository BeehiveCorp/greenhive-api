import { FastifyReply, FastifyRequest } from 'fastify'

import { User } from '@/domain/models'

import { UserContract } from '@/application/contracts'
import { CreateUserUseCase } from '@/application/usecases/user'

export const createUserController = (prismaUserRepository: UserContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const data = request.body as User

    const user = new User(data)

    const createUserUseCase = new CreateUserUseCase(prismaUserRepository)
    const createdUser = await createUserUseCase.execute(user)

    return reply.send(createdUser)
  }
}
