import { FastifyPluginCallback } from 'fastify'

import { prisma } from '@/infrastructure/db/prisma'
import { PrismaUserRepository } from '@/infrastructure/repositories'
import { CreateUserUseCase } from '@/application/usecases/user'
import { UserController } from '@/web/controllers'

export const userRoutes: FastifyPluginCallback = (fastify, _, done) => {
  const prismaUserRepository = new PrismaUserRepository(prisma)

  const createUserUseCase = new CreateUserUseCase(prismaUserRepository)

  const userController = new UserController(createUserUseCase)

  fastify.post('/user/create', userController.createUser)

  done()
}
