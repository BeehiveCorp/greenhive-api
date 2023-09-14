import { CommentContract } from '@/application/contracts'
import { Comment } from '@/domain/models'

interface IListByPostIdUseCase {
  execute: CommentContract['findAllByPostId']
}

export class ListByPostIdUseCase implements IListByPostIdUseCase {
  private readonly commentRepository: CommentContract

  constructor(commentRepository: CommentContract) {
    this.commentRepository = commentRepository
  }

  async execute(id: string): Promise<Comment[]> {
    const found = await this.commentRepository.findAllByPostId(id)
    return found
  }
}
