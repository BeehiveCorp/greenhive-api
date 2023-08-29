import { UserContract } from '@/application/contracts'
import { User } from '@/domain/models'

interface IFindByEmailUseCase {
  execute: UserContract['findByUsername']
}

export class FindByEmailUseCase implements IFindByEmailUseCase {
  private readonly userRepository: UserContract

  constructor(userRepository: UserContract) {
    this.userRepository = userRepository
  }

  async execute(email: string): Promise<User | null> {
    const found = await this.userRepository.findByEmail(email)
    return found
  }
}
