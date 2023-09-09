/* eslint-disable camelcase */

import { FastifyReply, FastifyRequest } from 'fastify'

import { ReadArticle } from '@/domain/models'

import {
  ArticleContract,
  ReadArticleContract,
  UserContract,
} from '@/application/contracts'

import { MarkArticleAsReadUseCase } from '@/application/usecases/read-article'

export const markArticleAsReadController = (
  articleRepository: ArticleContract,
  userRepository: UserContract,
  readArticleRepository: ReadArticleContract,
) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { article_id, reader_id } = request.body as ReadArticle

    const useCase = new MarkArticleAsReadUseCase(
      articleRepository,
      userRepository,
      readArticleRepository,
    )

    const created = await useCase.execute(article_id, reader_id)

    return reply.send(created)
  }
}
