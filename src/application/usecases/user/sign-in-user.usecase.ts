import { UserContract } from '@/application/contracts'
import { User } from '@/domain/models'

interface ISignInUserUseCase {
  execute: (email: string, password: string) => Promise<User | null>
}

export class SignInUserUseCase implements ISignInUserUseCase {
  private readonly userRepository: UserContract

  constructor(userRepository: UserContract) {
    this.userRepository = userRepository
  }

  async execute(email: string, password: string): Promise<User | null> {
    const foundUser = await this.userRepository.findByEmail(email)

    if (!foundUser) return null

    if (foundUser.password !== password) return null

    return foundUser
  }
}
