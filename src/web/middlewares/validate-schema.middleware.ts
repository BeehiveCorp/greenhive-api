import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export const validateSchemaMiddleware = (schema: z.Schema) => {
  return async (
    request: FastifyRequest,
    reply: FastifyReply,
    done: () => void,
  ) => {
    try {
      schema.parse(request.body)
      done()
    } catch (error) {
      if (error instanceof z.ZodError)
        return reply.status(400).send({ errors: error.issues })

      return reply.status(500).send({ message: 'Internal Server Error' })
    }
  }
}
