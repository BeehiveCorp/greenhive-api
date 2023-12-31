/* eslint-disable camelcase */
import { NetworkContract, UserContract } from '@/application/contracts'
import { NotFoundError } from '@/application/errors'
import { User } from '@/domain/models'

interface IListFollowersUseCase {
  execute: (following_id: string) => Promise<User[]>
}

export class ListFollowersUseCase implements IListFollowersUseCase {
  private readonly networkRepository: NetworkContract
  private readonly userRepository: UserContract

  constructor(
    networkRepository: NetworkContract,
    userRepository: UserContract,
  ) {
    this.networkRepository = networkRepository
    this.userRepository = userRepository
  }

  async execute(following_id: string): Promise<User[]> {
    const following = await this.userRepository.findById(following_id)

    if (!following) throw new NotFoundError('Usuário não encontrado.')

    const found = await this.networkRepository.getAllFollowers(following)

    console.log('found', found)

    return found
  }
}
