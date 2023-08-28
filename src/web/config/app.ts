import path from 'path'

import cors from '@fastify/cors'
import fastify from 'fastify'
import multipart from '@fastify/multipart'
import staticFiles from '@fastify/static'

import { router } from '@/web/config'

export const buildApp = () => {
  const root = path.join(__dirname, '../../../')

  const app = fastify()

  app.register(multipart)
  app.register(cors)
  app.register(router)

  app.register(staticFiles, {
    root: path.join(root, 'fake-s3'),
    prefix: '/fake-s3',
  })

  return app
}
