import { FastifyReply, FastifyRequest } from 'fastify'

import { ArticleContract } from '@/application/contracts'
import { FindArticleUseCase } from '@/application/usecases/article'

import { BaseError } from '@/application/errors'

import { ResponseHandler } from '@/web/utils'

export const findArticleController = (repository: ArticleContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string }

      const useCase = new FindArticleUseCase(repository)
      const articles = await useCase.execute(id)
      return reply.status(200).send(articles)
    } catch (error) {
      ResponseHandler.error(reply, error as BaseError)
    }
  }
}
