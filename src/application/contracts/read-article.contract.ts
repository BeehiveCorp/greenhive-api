import { Article, User } from '@/domain/models'

export interface ReadArticleContract {
  create(article: Article, reader: User): Promise<void>
}
