/* eslint-disable camelcase */

import { FastifyReply, FastifyRequest } from 'fastify'

import { ReadArticle } from '@/domain/models'

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
    const { article_id, reader_id } = request.body as ReadArticle

    const useCase = new ReactToUseCase(
      postRepository,
      userRepository,
      postReactionRepository,
    )

    const created = await useCase.execute(article_id, reader_id)

    return reply.send(created)
  }
}
