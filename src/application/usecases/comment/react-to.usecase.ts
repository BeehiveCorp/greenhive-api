import { PostContract } from '@/application/contracts'
import { NotFoundError } from '@/application/errors'
import { Comment } from '@/domain/models'

interface IReactToUseCase {
  execute: (id: string) => Promise<Comment | null>
}

export class ReactToUseCase implements IReactToUseCase {
  private readonly commentRepository: PostContract

  constructor(commentRepository: PostContract) {
    this.commentRepository = commentRepository
  }

  async execute(id: string): Promise<Comment | null> {
    const found = await this.commentRepository.findById(id)

    if (!found) throw new NotFoundError('Comentário não encontrado.')

    const updated = await this.commentRepository.update({
      ...found,
      reactions: found.reactions + 1,
    })

    return updated
  }
}
