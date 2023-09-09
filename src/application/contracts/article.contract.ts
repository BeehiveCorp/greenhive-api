import { Article } from '@/domain/models'

export interface ArticleContract {
  create(article: Article): Promise<Article>
  findAll(): Promise<Article[]>
  findById(id: string): Promise<Article | null>
  view(article: Article): Promise<void | null>
}
