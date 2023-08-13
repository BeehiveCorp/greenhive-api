import { UserContract } from '@/application/contracts'
import { User } from '@/domain/models'

interface ICreateUserUseCase {
  execute: UserContract['create']
}

export class CreateUserUseCase implements ICreateUserUseCase {
  private readonly userRepository: UserContract

  constructor(userRepository: UserContract) {
    this.userRepository = userRepository
  }

  async execute(user: User): Promise<User> {
    const created = await this.userRepository.create(user)
    return created
  }
}
