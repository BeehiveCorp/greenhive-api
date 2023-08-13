import { BaseError, InternalServerError } from '@/application/errors'
import { FastifyReply } from 'fastify'

export class ResponseHandler {
  static error(reply: FastifyReply, error: BaseError) {
    if (error?.statusCode) {
      reply.status(error.statusCode).send(error.toJson())
    } else {
      const internalServerError = new InternalServerError()
      reply
        .status(internalServerError.statusCode)
        .send(internalServerError.toJson())
    }
  }
}
