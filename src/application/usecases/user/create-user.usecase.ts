import { UserContract, ICreateUserUseCase } from '@/application/contracts'
import { User } from '@/domain/models'

export class CreateUserUseCase implements ICreateUserUseCase {
  private readonly userRepository: UserContract

  constructor(userRepository: UserContract) {
    this.userRepository = userRepository
  }

  async execute(user: User): Promise<User> {
    return this.userRepository.create(user)
  }
}
