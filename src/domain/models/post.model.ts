type TPost = {
  id?: string
  type: 'PUBLIC' | 'CORPORATE'
  description: string
  picture_url: string
  company_id?: string | null
  created_at: Date
  updated_at: Date
  author_id: string
}

export class Post {
  public readonly id?: string
  public readonly type: 'PUBLIC' | 'CORPORATE'
  public readonly description: string
  public picture_url: string
  public readonly author_id: string
  public readonly company_id?: string | null
  public readonly created_at: Date
  public readonly updated_at: Date

  constructor(data: TPost) {
    this.id = data.id
    this.type = data.type
    this.description = data.description
    this.picture_url = data.picture_url
    this.company_id = data.company_id || null
    this.author_id = data.author_id
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}
