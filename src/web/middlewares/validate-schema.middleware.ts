import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { InternalServerError, ValidationError } from '@/application/errors'

import { ResponseHandler } from '../utils'

export const validateSchemaMiddleware = (schema: z.Schema) => {
  const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    if (issue.code === z.ZodIssueCode.invalid_type) {
      return { message: `Campo ${issue.path[0]} obrigatório` }
    }

    return { message: ctx.defaultError }
  }

  z.setErrorMap(customErrorMap)

  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      schema.parse(request.body)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const issues = error.issues.map((issue) => issue.message).join(', ')

        return ResponseHandler.error(reply, new ValidationError(issues))
      }

      return ResponseHandler.error(reply, new InternalServerError())
    }
  }
}
