import { PostContract } from '@/application/contracts'
import { Post } from '@/domain/models'

interface IListPublicUseCase {
  execute: PostContract['findAll']
}

export class ListPublicUseCase implements IListPublicUseCase {
  private readonly postRepository: PostContract

  constructor(postRepository: PostContract) {
    this.postRepository = postRepository
  }

  async execute(): Promise<Post[]> {
    const found = await this.postRepository.findAll()
    return found
  }
}
