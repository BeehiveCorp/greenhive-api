import { FastifyPluginCallback } from 'fastify'

import { prisma } from '@/infrastructure/db/prisma'
import { PrismaHeroRepository } from '@/infrastructure/repositories'

import { authMiddleware } from '@/web/middlewares'

import {
  createHeroController,
  listHeroesController,
} from '@/web/controllers/hero'

export const heroRoutes: FastifyPluginCallback = (fastify, _, done) => {
  const prismaRepository = new PrismaHeroRepository(prisma)

  fastify.get('/hero/all', listHeroesController(prismaRepository))

  fastify.post(
    '/hero/create',
    { preHandler: [authMiddleware()] },
    createHeroController(prismaRepository),
  )

  done()
}
