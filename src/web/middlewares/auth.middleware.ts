import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'

export const authMiddleware = () => {
  return async (
    request: FastifyRequest,
    reply: FastifyReply,
    done: () => void,
  ) => {
    const token = request.headers?.authorization

    if (!token) return reply.status(401).send({ message: 'Token not provided' })

    try {
      const decoded = jwt.verify(token, String(process.env.JWT_SECRET_KEY))

      if (typeof decoded !== 'string') {
        request.userId = decoded?.userId ?? null
      }

      done()
    } catch (err) {
      return reply.status(401).send({ message: 'Invalid token' })
    }
  }
}
