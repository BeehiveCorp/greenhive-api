import { FastifyPluginCallback } from 'fastify'

import { prisma } from '@/infrastructure/db/prisma'
import { PrismaCharacterRepository } from '@/infrastructure/repositories'

import { authMiddleware } from '@/web/middlewares'

import {
  createCharacterController,
  listCharactersController,
} from '@/web/controllers/character'

export const characterRoutes: FastifyPluginCallback = (fastify, _, done) => {
  const prismaRepository = new PrismaCharacterRepository(prisma)

  fastify.post('/character/create', createCharacterController(prismaRepository))

  fastify.get('/character/all', listCharactersController(prismaRepository))

  done()
}
