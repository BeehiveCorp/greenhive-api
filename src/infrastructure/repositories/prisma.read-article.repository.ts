import { PrismaClient } from '@prisma/client'

import { ReadArticleContract } from '@/application/contracts'
import { Article, User } from '@/domain/models'

export class PrismaReadArticleRepository implements ReadArticleContract {
  private readonly _prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this._prisma = prisma
  }

  async create(article: Article, reader: User): Promise<void> {
    if (!article?.id || !reader?.id) return

    await this._prisma.readArticle.create({
      data: {
        article_id: article.id,
        reader_id: reader.id,
      },
    })
  }
}
