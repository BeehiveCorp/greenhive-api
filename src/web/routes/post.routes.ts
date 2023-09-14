import { FastifyPluginCallback } from 'fastify'

import { prisma } from '@/infrastructure/db/prisma'
import {
  PrismaPostRepository,
  PrismaUserRepository,
} from '@/infrastructure/repositories'

import { authMiddleware } from '@/web/middlewares'

import {
  createPostController,
  listPublicController,
  findByIdController,
  listCorporateController,
  findByUserIdController,
} from '@/web/controllers/post'

export const postRoutes: FastifyPluginCallback = (fastify, _, done) => {
  const prismaPostRepository = new PrismaPostRepository(prisma)
  const prismaUserRepository = new PrismaUserRepository(prisma)

  fastify.addHook('preHandler', authMiddleware())

  fastify.post('/post/create', createPostController(prismaPostRepository))

  fastify.get('/post/all', listPublicController(prismaPostRepository))

  fastify.get('/post/:id', findByIdController(prismaPostRepository))

  fastify.get(
    '/post/corporate/:id/all',
    listCorporateController(prismaPostRepository),
  )

  fastify.get(
    '/post/user/:id/all',
    findByUserIdController(prismaPostRepository, prismaUserRepository),
  )

  done()
}
