import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResponseHandler } from '../utils'
import { InternalServerError, ValidationError } from '@/application/errors'

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
      if (error instanceof z.ZodError) {
        const missingFields = error.issues
          .map((issue) => issue.path.join('.'))
          .join(', ')

        const message = `O(s) campo(s) ${missingFields} está(ão) faltando na requisição.`

        return ResponseHandler.error(reply, new ValidationError(message))
      }

      return ResponseHandler.error(reply, new InternalServerError())
    }
  }
}
