import { FastifyReply, FastifyRequest } from 'fastify'

import { UserContract } from '@/application/contracts'
import { SignInUserUseCase } from '@/application/usecases/user'
import { generateJwtToken } from '@/web/utils'

export const signInUserController = (prismaUserRepository: UserContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as {
      email: string
      password: string
    }

    const signInUserUseCase = new SignInUserUseCase(prismaUserRepository)
    const foundUser = await signInUserUseCase.execute(email, password)

    if (!foundUser?.id)
      return reply.status(404).send({ message: 'User not found' })

    return reply.status(200).send({
      user: foundUser,
      token: generateJwtToken(foundUser.id),
    })
  }
}
