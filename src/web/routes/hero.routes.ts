import { FastifyPluginCallback } from 'fastify'

import { prisma } from '@/infrastructure/db/prisma'
import { PrismaHeroRepository } from '@/infrastructure/repositories'

import { authMiddleware, validateSchemaMiddleware } from '@/web/middlewares'

import { HeroCreateDTO } from '@/infrastructure/dtos/hero'

import {
  createHeroController,
  listHeroesController,
} from '@/web/controllers/hero'

export const heroRoutes: FastifyPluginCallback = (fastify, _, done) => {
  const prismaRepository = new PrismaHeroRepository(prisma)

  fastify.addHook('preHandler', authMiddleware())

  fastify.post('/hero/create', createHeroController(prismaRepository))

  fastify.get('/hero/all', listHeroesController(prismaRepository))

  done()
}
