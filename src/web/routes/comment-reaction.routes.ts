import { FastifyPluginCallback } from 'fastify'

import { prisma } from '@/infrastructure/db/prisma'

import {
  PrismaCommentRepository,
  PrismaUserRepository,
  PrismaCommentReactionRepository,
} from '@/infrastructure/repositories'

import { authMiddleware } from '@/web/middlewares'

import { reactToController } from '@/web/controllers/comment-reaction'

export const commentReactionRoutes: FastifyPluginCallback = (
  fastify,
  _,
  done,
) => {
  const commentRepository = new PrismaCommentRepository(prisma)
  const userRepository = new PrismaUserRepository(prisma)
  const commentReactionRepository = new PrismaCommentReactionRepository(prisma)

  fastify.addHook('preHandler', authMiddleware())

  fastify.post(
    '/comment-reaction/react-to',
    reactToController(
      commentRepository,
      userRepository,
      commentReactionRepository,
    ),
  )

  done()
}
