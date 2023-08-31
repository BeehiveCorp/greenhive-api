import { ArticleContract } from '@/application/contracts'
import { Article } from '@/domain/models'

interface IListArticlesUseCase {
  execute: ArticleContract['findAll']
}

export class ListArticlesUseCase implements IListArticlesUseCase {
  private readonly articleRepository: ArticleContract

  constructor(articleRepository: ArticleContract) {
    this.articleRepository = articleRepository
  }

  async execute(): Promise<Article[]> {
    const articles = await this.articleRepository.findAll()
    return articles
  }
}
