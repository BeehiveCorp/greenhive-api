import { Post } from '@/domain/models'

export interface PostContract {
  create(post: Post): Promise<Post>
  findAll(): Promise<Post[]>
  findById(id: string): Promise<Post | null>
  findAllByCompanyId(id: string): Promise<Post[]>
  update(post: Post): Promise<Post>
}
