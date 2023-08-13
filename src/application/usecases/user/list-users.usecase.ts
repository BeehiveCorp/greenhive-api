import { UserContract, IListUsersUseCase } from '@/application/contracts'
import { User } from '@/domain/models'

export class ListUsersUseCase implements IListUsersUseCase {
  private readonly userRepository: UserContract

  constructor(userRepository: UserContract) {
    this.userRepository = userRepository
  }

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll()
    return users
  }
}
