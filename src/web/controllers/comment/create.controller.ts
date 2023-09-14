import { FastifyReply, FastifyRequest } from 'fastify'

import { Comment } from '@/domain/models'

import { CommentContract } from '@/application/contracts'
import { CreateCommentUseCase } from '@/application/usecases/comment'

import { ResponseHandler } from '@/web/utils'
import { BaseError } from '@/application/errors'

export const createCommentController = (repository: CommentContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const comment = request.body as Comment

      const useCase = new CreateCommentUseCase(repository)

      const created = await useCase.execute(comment)

      return reply.send(created)
    } catch (error) {
      ResponseHandler.error(reply, error as BaseError)
    }
  }
}
