/* eslint-disable camelcase */
import {
  ArticleContract,
  ReadArticleContract,
  UserContract,
} from '@/application/contracts'

import { NotFoundError } from '@/application/errors'

interface IMarkArticleAsReadUseCase {
  execute: (article_id: string, reader_id: string) => Promise<void>
}

export class MarkArticleAsReadUseCase implements IMarkArticleAsReadUseCase {
  private readonly articleRepository: ArticleContract
  private readonly userRepository: UserContract
  private readonly readArticleRepository: ReadArticleContract

  constructor(
    articleRepository: ArticleContract,
    userRepository: UserContract,
    readArticleRepository: ReadArticleContract,
  ) {
    this.articleRepository = articleRepository
    this.userRepository = userRepository
    this.readArticleRepository = readArticleRepository
  }

  async execute(article_id: string, reader_id: string): Promise<void> {
    const article = await this.articleRepository.findById(article_id)
    const reader = await this.userRepository.findById(reader_id)

    if (!article) throw new NotFoundError('Artigo não encontrado.')
    if (!reader) throw new NotFoundError('Leitor não encontrado.')

    await this.readArticleRepository.create(article, reader)
  }
}
