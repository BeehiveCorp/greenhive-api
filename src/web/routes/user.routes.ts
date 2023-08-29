import { FastifyPluginCallback } from 'fastify'

import { prisma } from '@/infrastructure/db/prisma'
import { PrismaUserRepository } from '@/infrastructure/repositories'

import { authMiddleware, validateSchemaMiddleware } from '@/web/middlewares'

import { UserCreateDTO, UserSignInDTO } from '@/infrastructure/dtos/user'

import {
  createUserController,
  listUsersController,
  signInUserController,
  signInAdmUserController,
  findByUsernameController,
  findByEmailController,
} from '@/web/controllers/user'

export const userRoutes: FastifyPluginCallback = (fastify, _, done) => {
  const prismaUserRepository = new PrismaUserRepository(prisma)

  fastify.post(
    '/user/create',
    { preHandler: [validateSchemaMiddleware(UserCreateDTO)] },
    createUserController(prismaUserRepository),
  )

  fastify.post(
    '/user/sign-in',
    { preHandler: [validateSchemaMiddleware(UserSignInDTO)] },
    signInUserController(prismaUserRepository),
  )

  fastify.post(
    '/user/adm/sign-in',
    { preHandler: [validateSchemaMiddleware(UserSignInDTO)] },
    signInAdmUserController(prismaUserRepository),
  )

  fastify.get(
    '/user/all',
    { preHandler: [authMiddleware()] },
    listUsersController(prismaUserRepository),
  )

  fastify.get(
    '/user/username/:username',
    findByUsernameController(prismaUserRepository),
  )

  fastify.get('/user/email/:email', findByEmailController(prismaUserRepository))

  done()
}
