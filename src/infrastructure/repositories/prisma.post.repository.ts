import { PrismaClient } from '@prisma/client'
import _ from 'lodash'

import { PostContract } from '@/application/contracts'
import { Post } from '@/domain/models'

export class PrismaPostRepository implements PostContract {
  private readonly _prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this._prisma = prisma
  }

  async create(post: Post): Promise<Post> {
    const created = await this._prisma.post.create({
      data: post,
    })

    return created
  }

  async findAll(): Promise<Post[]> {
    const posts = await this._prisma.post.findMany({
      include: { author: true, comments: true, reactions: true },
    })

    const flattenedResults = _.map(posts, (post) => ({
      ...post,
      reactions: _.map(post.reactions, 'user_id'),
    }))

    return flattenedResults
  }

  async findById(id: string): Promise<Post | null> {
    const found = await this._prisma.post.findFirst({
      where: { id },
      include: { author: true, comments: true, reactions: true },
    })

    const whoReactedIds = _.map(found?.reactions, 'user_id')

    const articleWithReaderIds = { ...found, reactions: whoReactedIds } as Post

    return articleWithReaderIds
  }

  async findAllByCompanyId(id: string): Promise<Post[]> {
    const found = await this._prisma.post.findMany({
      where: { company_id: id },
      include: { author: true, comments: true, reactions: true },
    })

    return found
  }

  async update(post: Post): Promise<Post> {
    const updated = this._prisma.post.update({
      data: post,
      where: { id: post.id },
    })

    return updated
  }
}
