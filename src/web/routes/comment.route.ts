import { FastifyPluginCallback } from 'fastify'

import { prisma } from '@/infrastructure/db/prisma'
import { PrismaCommentRepository } from '@/infrastructure/repositories'

import { authMiddleware } from '@/web/middlewares'

import {
  createCommentController,
  listByPostController,
} from '@/web/controllers/comment'

export const commentRoutes: FastifyPluginCallback = (fastify, _, done) => {
  const prismaCommentRepository = new PrismaCommentRepository(prisma)

  fastify.addHook('preHandler', authMiddleware())

  fastify.post(
    '/comment/create',
    createCommentController(prismaCommentRepository),
  )

  fastify.get(
    '/comment/post/:id/all',
    listByPostController(prismaCommentRepository),
  )

  done()
}
