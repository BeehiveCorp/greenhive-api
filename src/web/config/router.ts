import { FastifyPluginCallback } from 'fastify'

import { difficultyRoutes, userRoutes } from '@/web/routes'

export const router: FastifyPluginCallback = (fastify, _, done) => {
  fastify.register(userRoutes)
  fastify.register(difficultyRoutes)
  done()
}
