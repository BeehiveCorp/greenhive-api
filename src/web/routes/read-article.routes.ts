import { FastifyPluginCallback } from 'fastify'

import { prisma } from '@/infrastructure/db/prisma'

import {
  PrismaArticleRepository,
  PrismaUserRepository,
} from '@/infrastructure/repositories'

import { authMiddleware } from '@/web/middlewares'

import { markArticleAsReadController } from '@/web/controllers/read-article'
import { PrismaReadArticleRepository } from '@/infrastructure/repositories/prisma.read-article.repository'

export const readArticleRoutes: FastifyPluginCallback = (fastify, _, done) => {
  const articleRepository = new PrismaArticleRepository(prisma)
  const userRepository = new PrismaUserRepository(prisma)
  const readArticleRepository = new PrismaReadArticleRepository(prisma)

  fastify.addHook('preHandler', authMiddleware())

  fastify.post(
    '/read-article/mark-as-read',
    markArticleAsReadController(
      articleRepository,
      userRepository,
      readArticleRepository,
    ),
  )

  done()
}
