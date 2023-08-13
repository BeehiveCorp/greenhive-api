import { FastifyPluginCallback } from 'fastify'

import { prisma } from '@/infrastructure/db/prisma'
import { PrismaUserRepository } from '@/infrastructure/repositories'

import { authMiddleware, validateSchemaMiddleware } from '@/web/middlewares'

import { UserCreateDTO, UserSignInDTO } from '@/infrastructure/dtos/user'

import {
  createUserController,
  listUsersController,
  signInUserController,
} from '@/web/controllers/user'

export const userRoutes: FastifyPluginCallback = (fastify, _, done) => {
  const prismaUserRepository = new PrismaUserRepository(prisma)

  fastify.post(
    '/user/create',
    { preHandler: [validateSchemaMiddleware(UserCreateDTO), authMiddleware()] },
    createUserController(prismaUserRepository),
  )

  fastify.post(
    '/user/sign-in',
    { preHandler: [validateSchemaMiddleware(UserSignInDTO)] },
    signInUserController(prismaUserRepository),
  )

  fastify.get(
    '/user/all',
    { preHandler: [authMiddleware()] },
    listUsersController(prismaUserRepository),
  )

  done()
}
