import { FastifyPluginCallback } from 'fastify'

import { prisma } from '@/infrastructure/db/prisma'
import { PrismaPostRepository } from '@/infrastructure/repositories'

import { authMiddleware } from '@/web/middlewares'

import {
  createPostController,
  listPublicController,
  findByIdController,
  listCorporateController,
} from '@/web/controllers/post'

export const postRoutes: FastifyPluginCallback = (fastify, _, done) => {
  const prismaPostRepository = new PrismaPostRepository(prisma)

  fastify.addHook('preHandler', authMiddleware())

  fastify.post('/post/create', createPostController(prismaPostRepository))

  fastify.get('/post/all', listPublicController(prismaPostRepository))

  fastify.get('/post/:id', findByIdController(prismaPostRepository))

  fastify.get(
    '/post/corporate/:id/all',
    listCorporateController(prismaPostRepository),
  )

  done()
}
