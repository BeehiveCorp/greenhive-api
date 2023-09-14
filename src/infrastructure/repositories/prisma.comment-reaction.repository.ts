import { PrismaClient } from '@prisma/client'

import { CommentReactionContract } from '@/application/contracts'
import { Comment, User } from '@/domain/models'

export class PrismaCommentReactionRepository
  implements CommentReactionContract
{
  private readonly _prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this._prisma = prisma
  }

  async create(comment: Comment, whoReacted: User): Promise<void> {
    if (!comment?.id || !whoReacted?.id) return

    await this._prisma.commentReaction.create({
      data: {
        comment_id: comment.id,
        user_id: whoReacted.id,
      },
    })
  }
}
