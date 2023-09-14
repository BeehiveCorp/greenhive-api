type TReadArticle = {
  id?: string
  reader_id: string
  article_id: string
  created_at: Date
  updated_at: Date
}

export class ReadArticle {
  public readonly id?: string
  public readonly reader_id: string
  public readonly article_id: string
  public readonly created_at: Date
  public readonly updated_at: Date

  constructor(data: TReadArticle) {
    this.id = data.id
    this.reader_id = data.reader_id
    this.article_id = data.article_id
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}
