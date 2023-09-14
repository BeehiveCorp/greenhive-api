import { PostContract } from '@/application/contracts'
import { Post } from '@/domain/models'

interface ICreateUseCase {
  execute: PostContract['create']
}

export class CreateUseCase implements ICreateUseCase {
  private readonly postRepository: PostContract

  constructor(postRepository: PostContract) {
    this.postRepository = postRepository
  }

  async execute(article: Post): Promise<Post> {
    const created = await this.postRepository.create(article)
    return created
  }
}
