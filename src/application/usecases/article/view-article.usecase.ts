import { ArticleContract } from '@/application/contracts'
import { BadRequestError, NotFoundError } from '@/application/errors'

interface IViewArticleUseCase {
  execute: (id?: string) => Promise<void>
}

export class ViewArticleUseCase implements IViewArticleUseCase {
  private readonly articleRepository: ArticleContract

  constructor(articleRepository: ArticleContract) {
    this.articleRepository = articleRepository
  }

  async execute(id?: string): Promise<void> {
    if (!id) throw new BadRequestError('Está faltando o id do artigo.')

    const article = await this.articleRepository.findById(id)

    if (!article) throw new NotFoundError('Artigo não encontrado.')

    await this.articleRepository.view(article)
  }
}
