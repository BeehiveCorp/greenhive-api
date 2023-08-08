import { User } from '@/domain/models'

export interface ICreateUserUseCase {
  execute(user: User): Promise<User>
}

export interface UserContract {
  create(user: User): Promise<User>
  findByEmail(email: string): Promise<User | undefined>
}
