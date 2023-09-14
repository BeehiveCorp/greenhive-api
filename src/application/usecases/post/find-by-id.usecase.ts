import { PostContract } from '@/application/contracts'
import { BadRequestError, NotFoundError } from '@/application/errors'
import { Post } from '@/domain/models'

interface IFindByIdUseCase {
  execute: (id?: string) => Promise<Post>
}

export class FindByIdUseCase implements IFindByIdUseCase {
  private readonly postRepository: PostContract

  constructor(postRepository: PostContract) {
    this.postRepository = postRepository
  }

  async execute(id?: string): Promise<Post> {
    if (!id) throw new BadRequestError('Está faltando o id do post.')

    const found = await this.postRepository.findById(id)

    if (!found) throw new NotFoundError('Postagem não encontrada.')

    return found
  }
}
