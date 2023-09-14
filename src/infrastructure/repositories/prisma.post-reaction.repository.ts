import { PrismaClient } from '@prisma/client'

import { PostReactionContract } from '@/application/contracts'
import { Post, User } from '@/domain/models'

export class PrismaPostReactionRepository implements PostReactionContract {
  private readonly _prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this._prisma = prisma
  }

  async create(post: Post, whoReacted: User): Promise<void> {
    if (!post?.id || !whoReacted?.id) return

    await this._prisma.postReaction.create({
      data: {
        post_id: post.id,
        user_id: whoReacted.id,
      },
    })
  }
}
