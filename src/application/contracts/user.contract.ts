import { User } from '@/domain/models'

export interface UserContract {
  create(user: User): Promise<User>
  update(user: User): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findByUsername(username: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  findAll(): Promise<User[]>
}
