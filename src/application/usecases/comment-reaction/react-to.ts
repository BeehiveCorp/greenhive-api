/* eslint-disable camelcase */
import {
  CommentReactionContract,
  UserContract,
  CommentContract,
} from '@/application/contracts'

import { NotFoundError } from '@/application/errors'

interface IReactToUseCase {
  execute: (who_reacted_id: string, post_id: string) => Promise<void>
}

export class ReactToUseCase implements IReactToUseCase {
  private readonly commentRepository: CommentContract
  private readonly userRepository: UserContract
  private readonly commentReactionRepository: CommentReactionContract

  constructor(
    commentRepository: CommentContract,
    userRepository: UserContract,
    commentReactionRepository: CommentReactionContract,
  ) {
    this.commentRepository = commentRepository
    this.userRepository = userRepository
    this.commentReactionRepository = commentReactionRepository
  }

  async execute(who_reacted_id: string, post_id: string): Promise<void> {
    const whoReacted = await this.userRepository.findById(who_reacted_id)
    const reactedComment = await this.commentRepository.findById(post_id)

    if (!whoReacted) throw new NotFoundError('Usuário não encontrado.')
    if (!reactedComment) throw new NotFoundError('Comentário não encontrado.')

    await this.commentReactionRepository.create(reactedComment, whoReacted)
  }
}
