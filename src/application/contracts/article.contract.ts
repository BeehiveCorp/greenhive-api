import { Article } from '@/domain/models'

export interface ArticleContract {
  create(article: Article): Promise<Article>
  findAll(): Promise<Article[]>
  view(article: Article): void
  read(article: Article): void
}
