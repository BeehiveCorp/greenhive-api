import { FastifyPluginCallback } from 'fastify'

import { prisma } from '@/infrastructure/db/prisma'
import { PrismaUserRepository } from '@/infrastructure/repositories'
import { CreateUserUseCase } from '@/application/usecases/user'
import { UserController } from '@/web/controllers'
import { User } from '@/domain/models'

export const userRoutes: FastifyPluginCallback = (fastify, _, done) => {
  const prismaUserRepository = new PrismaUserRepository(prisma)

  const createUserUseCase = new CreateUserUseCase(prismaUserRepository)

  // const userController = new UserController(createUserUseCase)

  fastify.post('/user/create', async (req, reply) => {
    const { name, email } = req.body as { name: string; email: string }

    const user = new User({ name, email })

    const createdUser = await createUserUseCase.execute(user)

    return reply.send(createdUser)
  })

  done()
}
