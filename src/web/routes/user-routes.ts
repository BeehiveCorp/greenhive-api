import { FastifyPluginCallback } from 'fastify'

import { prisma } from '@/infrastructure/db/prisma'
import { CreateUserUseCase } from '@/application/usecases/user'

import { UserController } from '@/web/controllers'
import { PrismaUserRepository } from '@/infrastructure/repositories'

export const userRoutes: FastifyPluginCallback = (fastify, _, done) => {
  const prismaUserRepository = new PrismaUserRepository(prisma)

  const createUserUseCase = new CreateUserUseCase(prismaUserRepository)

  const userController = new UserController(createUserUseCase)

  fastify.get('/', userController.createUser)

  done()
}
