import { FastifyPluginCallback } from 'fastify'

import { userRoutes } from '@/web/routes'

export const router: FastifyPluginCallback = (fastify, _, done) => {
  fastify.register(userRoutes)

  done()
}
