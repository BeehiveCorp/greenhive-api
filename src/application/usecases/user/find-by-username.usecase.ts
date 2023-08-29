import { UserContract } from '@/application/contracts'
import { User } from '@/domain/models'

interface IFindByUsernameUseCase {
  execute: UserContract['findByEmail']
}

export class FindByUsernameUseCase implements IFindByUsernameUseCase {
  private readonly userRepository: UserContract

  constructor(userRepository: UserContract) {
    this.userRepository = userRepository
  }

  async execute(username: string): Promise<User | null> {
    const found = await this.userRepository.findByUsername(username)
    return found
  }
}
