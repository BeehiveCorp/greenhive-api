import { Network, User } from '@/domain/models'

export interface NetworkContract {
  create(follower: User, following: User): Promise<void>
  delete(network: Network): Promise<void>
  getAllFollowers(following: User): Promise<User[]>
  getAllFollowing(follower: User): Promise<User[]>
  findById(id: string): Promise<Network | null>
}
