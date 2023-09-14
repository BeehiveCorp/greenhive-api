import { Post, User } from '@/domain/models'

export interface PostReactionContract {
  create(post: Post, whoReacted: User): Promise<void>
}
