import { Comment, User } from '@/domain/models'

export interface CommentReactionContract {
  create(comment: Comment, whoReacted: User): Promise<void>
}
