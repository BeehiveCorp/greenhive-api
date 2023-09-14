/* eslint-disable camelcase */

import { FastifyReply, FastifyRequest } from 'fastify'

import { CommentReaction } from '@/domain/models'

import {
  CommentReactionContract,
  UserContract,
  CommentContract,
} from '@/application/contracts'

import { ReactToUseCase } from '@/application/usecases/comment-reaction'

export const reactToController = (
  commentRepository: CommentContract,
  userRepository: UserContract,
  commentReactionRepository: CommentReactionContract,
) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { comment_id, user_id } = request.body as CommentReaction

    const useCase = new ReactToUseCase(
      commentRepository,
      userRepository,
      commentReactionRepository,
    )

    const created = await useCase.execute(user_id, comment_id)

    return reply.send(created)
  }
}
