import { FastifyPluginCallback } from 'fastify'

import { prisma } from '@/infrastructure/db/prisma'
import { PrismaArticleRepository } from '@/infrastructure/repositories'

import { authMiddleware } from '@/web/middlewares'

import {
  createArticleController,
  listArticlesController,
} from '@/web/controllers/article'

export const articleRoutes: FastifyPluginCallback = (fastify, _, done) => {
  const prismaRepository = new PrismaArticleRepository(prisma)

  fastify.addHook('preHandler', authMiddleware())

  fastify.get('/article/all', listArticlesController(prismaRepository))

  fastify.post('/article/create', createArticleController(prismaRepository))

  done()
}
