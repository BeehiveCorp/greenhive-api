import { FastifyReply, FastifyRequest } from 'fastify'

import { Article } from '@/domain/models'

import { ArticleContract } from '@/application/contracts'
import { CreateArticleUseCase } from '@/application/usecases/article'

import { ResponseHandler } from '@/web/utils'
import { InternalServerError } from '@/application/errors'

import { uploadFile } from '@/web/utils/upload-file'

export const createArticleController = (repository: ArticleContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { data: article, fileName } = await uploadFile<Article>({
      DataClass: Article,
      folderName: 'article',
      parts: request.parts(),
    })

    if (!article) {
      ResponseHandler.error(reply, new InternalServerError('Algo deu errado!'))
      return
    }

    article.thumbnail_url = `/fake-s3/article/${fileName}`

    const useCase = new CreateArticleUseCase(repository)

    const created = await useCase.execute(article)

    return reply.send(created)
  }
}
