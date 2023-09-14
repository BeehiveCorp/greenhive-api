import { Comment } from '@/domain/models'

export interface CommentContract {
  create(comment: Comment): Promise<Comment>
  findAllByPostId(id: string): Promise<Comment[]>
  update(comment: Comment): Promise<Comment>
}
