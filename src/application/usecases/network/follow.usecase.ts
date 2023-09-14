/* eslint-disable camelcase */
import { NetworkContract, UserContract } from '@/application/contracts'

import { NotFoundError } from '@/application/errors'

interface IFollowUseCase {
  execute: (follower_id: string, following_id: string) => Promise<void>
}

export class FollowUseCase implements IFollowUseCase {
  private readonly networkRepository: NetworkContract
  private readonly userRepository: UserContract

  constructor(
    networkRepository: NetworkContract,
    userRepository: UserContract,
  ) {
    this.networkRepository = networkRepository
    this.userRepository = userRepository
  }

  async execute(follower_id: string, following_id: string): Promise<void> {
    const follower = await this.userRepository.findById(follower_id)
    const following = await this.userRepository.findById(following_id)

    if (!follower)
      throw new NotFoundError('Usuário a ser seguido não encontrado.')

    if (!following) throw new NotFoundError('Usuário a seguir não encontrado.')

    await this.networkRepository.create(follower, following)
  }
}
