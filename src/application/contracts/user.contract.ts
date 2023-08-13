import { User } from '@/domain/models'

export interface UserContract {
  create(user: User): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findAll(): Promise<User[]>
}
