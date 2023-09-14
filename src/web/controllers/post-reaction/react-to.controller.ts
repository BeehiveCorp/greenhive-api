/* eslint-disable camelcase */

import { FastifyReply, FastifyRequest } from 'fastify'

import { PostReaction } from '@/domain/models'

import {
  PostContract,
  PostReactionContract,
  UserContract,
} from '@/application/contracts'

import { ReactToUseCase } from '@/application/usecases/post-reaction'

export const reactToController = (
  postRepository: PostContract,
  userRepository: UserContract,
  postReactionRepository: PostReactionContract,
) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { post_id, user_id } = request.body as PostReaction

    const useCase = new ReactToUseCase(
      postRepository,
      userRepository,
      postReactionRepository,
    )

    const created = await useCase.execute(user_id, post_id)

    return reply.send(created)
  }
}
