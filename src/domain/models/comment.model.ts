type TComment = {
  id?: string
  description: string
  author_id: string
  post_id: string
  created_at: Date
  updated_at: Date
}

export class Comment {
  public readonly id?: string
  public readonly description: string
  public readonly author_id: string
  public readonly post_id: string
  public readonly created_at: Date
  public readonly updated_at: Date

  constructor(data: TComment) {
    this.id = data.id
    this.author_id = data.author_id
    this.post_id = data.post_id
    this.description = data.description
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}
