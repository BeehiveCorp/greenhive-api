import { FastifyReply, FastifyRequest } from 'fastify'

import { ArticleContract } from '@/application/contracts'
import { ListArticlesUseCase } from '@/application/usecases/article'

import { BaseError } from '@/application/errors'

import { ResponseHandler } from '@/web/utils'

export const listArticlesController = (repository: ArticleContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const useCase = new ListArticlesUseCase(repository)
      const articles = await useCase.execute()
      return reply.status(200).send(articles)
    } catch (error) {
      ResponseHandler.error(reply, error as BaseError)
    }
  }
}
