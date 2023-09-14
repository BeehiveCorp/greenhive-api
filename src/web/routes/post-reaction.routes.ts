import { FastifyPluginCallback } from 'fastify'

import { prisma } from '@/infrastructure/db/prisma'

import {
  PrismaPostRepository,
  PrismaUserRepository,
  PrismaPostReactionRepository,
} from '@/infrastructure/repositories'

import { authMiddleware } from '@/web/middlewares'

import { reactToController } from '@/web/controllers/post-reaction'

export const postReactionRoutes: FastifyPluginCallback = (fastify, _, done) => {
  const postRepository = new PrismaPostRepository(prisma)
  const userRepository = new PrismaUserRepository(prisma)
  const postReactionRepository = new PrismaPostReactionRepository(prisma)

  fastify.addHook('preHandler', authMiddleware())

  fastify.post(
    '/post-reaction/react-to',
    reactToController(postRepository, userRepository, postReactionRepository),
  )

  done()
}
