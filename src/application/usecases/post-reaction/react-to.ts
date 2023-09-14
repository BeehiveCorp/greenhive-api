/* eslint-disable camelcase */
import {
  PostContract,
  PostReactionContract,
  UserContract,
} from '@/application/contracts'

import { NotFoundError } from '@/application/errors'

interface IReactToUseCase {
  execute: (article_id: string, reader_id: string) => Promise<void>
}

export class ReactToUseCase implements IReactToUseCase {
  private readonly postRepository: PostContract
  private readonly userRepository: UserContract
  private readonly postReactionRepository: PostReactionContract

  constructor(
    postRepository: PostContract,
    userRepository: UserContract,
    postReactionRepository: PostReactionContract,
  ) {
    this.postRepository = postRepository
    this.userRepository = userRepository
    this.postReactionRepository = postReactionRepository
  }

  async execute(who_reacted_id: string, post_id: string): Promise<void> {
    const whoReacted = await this.userRepository.findById(who_reacted_id)
    const reactedPost = await this.postRepository.findById(post_id)

    if (!whoReacted) throw new NotFoundError('Usuário não encontrado.')
    if (!reactedPost) throw new NotFoundError('Postagem não encontrada.')

    await this.postReactionRepository.create(reactedPost, whoReacted)
  }
}
