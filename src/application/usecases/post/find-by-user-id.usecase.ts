import { PostContract, UserContract } from '@/application/contracts'
import { BadRequestError, NotFoundError } from '@/application/errors'
import { Post } from '@/domain/models'

interface IFindByUserIdUseCase {
  execute: PostContract['findByUserId']
}

export class FindByUserIdUseCase implements IFindByUserIdUseCase {
  private readonly postRepository: PostContract
  private readonly userRepository: UserContract

  constructor(postRepository: PostContract, userRepository: UserContract) {
    this.postRepository = postRepository
    this.userRepository = userRepository
  }

  async execute(id?: string): Promise<Post[]> {
    if (!id) throw new BadRequestError('Está faltando o id do usuário.')

    const user = await this.userRepository.findById(id)

    if (!user) throw new NotFoundError('Usuário não encontrado.')

    const posts = await this.postRepository.findByUserId(id)

    return posts
  }
}
