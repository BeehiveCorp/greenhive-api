import { FastifyPluginCallback } from 'fastify'

import { prisma } from '@/infrastructure/db/prisma'
import { PrismaCharacterRepository } from '@/infrastructure/repositories'

import { authMiddleware, validateSchemaMiddleware } from '@/web/middlewares'

import { CharacterCreateDTO } from '@/infrastructure/dtos/character'

import {
  createCharacterController,
  listCharactersController,
} from '@/web/controllers/character'

export const characterRoutes: FastifyPluginCallback = (fastify, _, done) => {
  const prismaRepository = new PrismaCharacterRepository(prisma)

  fastify.addHook('preHandler', authMiddleware())

  fastify.post(
    '/character/create',
    { preHandler: validateSchemaMiddleware(CharacterCreateDTO) },
    createCharacterController(prismaRepository),
  )

  fastify.get('/character/all', listCharactersController(prismaRepository))

  done()
}
