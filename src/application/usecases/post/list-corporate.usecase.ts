import { PostContract } from '@/application/contracts'
import { Post } from '@/domain/models'

interface IListCorporateUseCase {
  execute: PostContract['findAllByCompanyId']
}

export class ListCorporateUseCase implements IListCorporateUseCase {
  private readonly postRepository: PostContract

  constructor(postRepository: PostContract) {
    this.postRepository = postRepository
  }

  async execute(id: string): Promise<Post[]> {
    const found = await this.postRepository.findAllByCompanyId(id)
    return found
  }
}
