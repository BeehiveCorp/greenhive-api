import { PrismaClient } from '@prisma/client'

import { ArticleContract } from '@/application/contracts'
import { Article } from '@/domain/models'

export class PrismaArticleRepository implements ArticleContract {
  private readonly _prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this._prisma = prisma
  }

  async findAll(): Promise<Article[]> {
    const found = await this._prisma.article.findMany()
    return found
  }

  async create(article: Article): Promise<Article> {
    const created = await this._prisma.article.create({
      data: article,
    })

    return created
  }

  async view(article: Article): void {
    throw new Error('Method not implemented.')
  }

  async read(article: Article): void {
    throw new Error('Method not implemented.')
  }
}
