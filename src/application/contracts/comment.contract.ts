import { Comment } from '@/domain/models'

export interface CommentContract {
  create(comment: Comment): Promise<Comment>
  findAllByPostId(id: string): Promise<Comment[]>
  findById(id: string): Promise<Comment | null>
  update(comment: Comment): Promise<Comment>
}
