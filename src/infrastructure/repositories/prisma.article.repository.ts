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
        readers: {
          select: {
            reader: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    })

    const flattenedResults = found.map((article) => {
      const readerIds = article.readers.map(
        (readerEntry) => readerEntry.reader.id,
      )

      return {
        ...article,
        readers: readerIds,
      }
    })

    return flattenedResults
  }

  async create(article: Article): Promise<Article> {
    const created = await this._prisma.article.create({
      data: article,
    })

    return created
  }

  async findById(id: string): Promise<Article | null> {
    const found = await this._prisma.article.findUnique({
      where: { id },
      include: {
        author: true,
        readers: {
          select: {
            reader: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    })

    if (!found) {
      return null
    }

    const readerIds = found.readers.map((readerEntry) => readerEntry.reader.id)

    const articleWithReaderIds = {
      ...found,
      readers: readerIds,
    }

    return articleWithReaderIds
  }

  async view(article: Article): Promise<void> {
    await this._prisma.article.update({
      where: { id: article.id },
      data: { views: article.views + 1 },
    })
  }
}
