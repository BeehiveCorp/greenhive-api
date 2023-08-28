import { FastifyPluginCallback } from 'fastify'

import { prisma } from '@/infrastructure/db/prisma'
import { PrismaDifficultyRepository } from '@/infrastructure/repositories'

import { authMiddleware, validateSchemaMiddleware } from '@/web/middlewares'

import { DifficultyCreateDTO } from '@/infrastructure/dtos/difficulty'

import {
  createDifficultyController,
  listDifficultiesController,
} from '@/web/controllers/difficulty'

export const difficultyRoutes: FastifyPluginCallback = (fastify, _, done) => {
  const prismaDifficultyRepository = new PrismaDifficultyRepository(prisma)

  fastify.addHook('preHandler', authMiddleware())

  fastify.post(
    '/difficulty/create',
    { preHandler: validateSchemaMiddleware(DifficultyCreateDTO) },
    createDifficultyController(prismaDifficultyRepository),
  )

  fastify.get(
    '/difficulty/all',
    listDifficultiesController(prismaDifficultyRepository),
  )

  done()
}
