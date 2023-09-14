import { PrismaClient } from '@prisma/client'
import _ from 'lodash'

import { CommentContract } from '@/application/contracts'
import { Comment } from '@/domain/models'

export class PrismaCommentRepository implements CommentContract {
  private readonly _prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this._prisma = prisma
  }

  async findById(id: string): Promise<Comment | null> {
    const found = await this._prisma.comment.findFirst({
      where: { id },
      include: { author: true, reactions: true },
    })

    const whoReactedIds = _.map(found?.reactions, 'user_id')

    const articleWithReaderIds = {
      ...found,
      reactions: whoReactedIds,
    }

    return articleWithReaderIds as Comment
  }

  async create(comment: Comment): Promise<Comment> {
    const created = await this._prisma.comment.create({
      data: comment,
    })

    return created
  }

  async findAllByPostId(id: string): Promise<Comment[]> {
    const found = await this._prisma.comment.findMany({
      where: { post_id: id },
      include: { author: true },
    })

    return found
  }

  async update(comment: Comment): Promise<Comment> {
    const updated = this._prisma.comment.update({
      data: comment,
      where: { id: comment.id },
    })

    return updated
  }
}
