import { FastifyPluginCallback } from 'fastify'

import { prisma } from '@/infrastructure/db/prisma'
import { PrismaArticleRepository } from '@/infrastructure/repositories'

import { authMiddleware } from '@/web/middlewares'

import {
  createArticleController,
  listArticlesController,
  viewArticleController,
} from '@/web/controllers/article'

export const articleRoutes: FastifyPluginCallback = (fastify, _, done) => {
  const prismaRepository = new PrismaArticleRepository(prisma)

  fastify.get('/article/all', listArticlesController(prismaRepository))

  fastify.post(
    '/article/create',
    { preHandler: [authMiddleware()] },
    createArticleController(prismaRepository),
  )

  fastify.get('/article/view/:id', viewArticleController(prismaRepository))

  done()
}
