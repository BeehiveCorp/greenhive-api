import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import { ResponseHandler } from '../utils'
import { UnauthorizedError } from '@/application/errors'

export const authMiddleware = () => {
  return async (
    request: FastifyRequest,
    reply: FastifyReply,
    done: () => void,
  ) => {
    const token = request.headers?.authorization

    if (!token) return ResponseHandler.error(reply, new UnauthorizedError())

    try {
      const decoded = jwt.verify(token, String(process.env.JWT_SECRET_KEY))

      if (typeof decoded !== 'string') {
        request.userId = decoded?.userId ?? null
      }

      done()
    } catch {
      ResponseHandler.error(reply, new UnauthorizedError())
    }
  }
}
