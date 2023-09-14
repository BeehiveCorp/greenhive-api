import { CommentContract } from '@/application/contracts'
import { Comment } from '@/domain/models'

interface ICreateCommentUseCase {
  execute: CommentContract['create']
}

export class CreateCommentUseCase implements ICreateCommentUseCase {
  private readonly commentRepository: CommentContract

  constructor(commentRepository: CommentContract) {
    this.commentRepository = commentRepository
  }

  async execute(comment: Comment): Promise<Comment> {
    const created = await this.commentRepository.create(comment)
    return created
  }
}
