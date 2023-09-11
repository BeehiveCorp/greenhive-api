import { ArticleContract } from '@/application/contracts'
import { BadRequestError, NotFoundError } from '@/application/errors'
import { Article } from '@/domain/models'

interface IFindArticleUseCase {
  execute: (id?: string) => Promise<Article>
}

export class FindArticleUseCase implements IFindArticleUseCase {
  private readonly articleRepository: ArticleContract

  constructor(articleRepository: ArticleContract) {
    this.articleRepository = articleRepository
  }

  async execute(id?: string): Promise<Article> {
    if (!id) throw new BadRequestError('Está faltando o id do artigo.')

    const found = await this.articleRepository.findById(id)

    if (!found) throw new NotFoundError('Artigo não encontrado.')

    return found
  }
}
