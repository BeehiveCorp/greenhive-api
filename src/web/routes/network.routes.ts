import { FastifyPluginCallback } from 'fastify'

import { prisma } from '@/infrastructure/db/prisma'

import {
  PrismaNetworkRepository,
  PrismaUserRepository,
} from '@/infrastructure/repositories'

import { authMiddleware } from '@/web/middlewares'

import {
  followController,
  unfollowController,
  getFollowersController,
  getFollowingController,
} from '@/web/controllers/network'

export const networkRoutes: FastifyPluginCallback = (fastify, _, done) => {
  const networkRepository = new PrismaNetworkRepository(prisma)
  const userRepository = new PrismaUserRepository(prisma)

  fastify.addHook('preHandler', authMiddleware())

  fastify.post(
    '/network/follow',
    followController(networkRepository, userRepository),
  )

  fastify.get('/network/unfollow/:id', unfollowController(networkRepository))

  fastify.get(
    '/network/followers/:id',
    getFollowersController(networkRepository, userRepository),
  )

  fastify.get(
    '/network/following/:id',
    getFollowingController(networkRepository, userRepository),
  )

  done()
}
