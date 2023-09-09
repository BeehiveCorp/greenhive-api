import { PrismaClient } from '@prisma/client'

import { ArticleContract } from '@/application/contracts'
import { Article } from '@/domain/models'

export class PrismaArticleRepository implements ArticleContract {
  private readonly _prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this._prisma = prisma
  }

  async findAll(): Promise<Article[]> {
    const found = await this._prisma.article.findMany({
      include: {
        author: true,
      },
    })
    return found
  }

  async create(article: Article): Promise<Article> {
    const created = await this._prisma.article.create({
      data: article,
    })

    return created
  }

  async findById(id: string): Promise<Article | null> {
    const found = await this._prisma.article.findUnique({ where: { id } })
    return found
  }

  async view(article: Article): Promise<void> {
    await this._prisma.article.update({
      where: { id: article.id },
      data: { views: article.views + 1 },
    })
  }
}
