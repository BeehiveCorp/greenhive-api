import { FastifyReply, FastifyRequest } from 'fastify'

import { UserContract } from '@/application/contracts'
import { SignInAdmUserUseCase } from '@/application/usecases/user'
import { generateJwtToken } from '@/web/utils'

export const signInAdmUserController = (prismaUserRepository: UserContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as {
      email: string
      password: string
    }

    const signInAdmUserUseCase = new SignInAdmUserUseCase(prismaUserRepository)
    const foundUser = await signInAdmUserUseCase.execute(email, password)

    if (!foundUser?.id)
      return reply.status(404).send({ message: 'User not found' })

    reply.status(200).send({
      user: foundUser,
      token: generateJwtToken(foundUser.id),
    })
  }
}
