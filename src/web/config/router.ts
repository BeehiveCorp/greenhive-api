import { FastifyPluginCallback } from 'fastify'

import {
  difficultyRoutes,
  userRoutes,
  heroRoutes,
  characterRoutes,
  articleRoutes,
  readArticleRoutes,
} from '@/web/routes'

export const router: FastifyPluginCallback = (fastify, _, done) => {
  fastify.register(userRoutes)
  fastify.register(difficultyRoutes)
  fastify.register(heroRoutes)
  fastify.register(characterRoutes)
  fastify.register(articleRoutes)
  fastify.register(readArticleRoutes)
  done()
}
