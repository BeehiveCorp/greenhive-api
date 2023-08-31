import { ArticleContract } from '@/application/contracts'
import { Article } from '@/domain/models'

interface ICreateArticleUseCase {
  execute: ArticleContract['create']
}

export class CreateArticleUseCase implements ICreateArticleUseCase {
  private readonly articleRepository: ArticleContract

  constructor(articleRepository: ArticleContract) {
    this.articleRepository = articleRepository
  }

  async execute(article: Article): Promise<Article> {
    const created = await this.articleRepository.create(article)
    return created
  }
}
