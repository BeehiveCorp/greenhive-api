type TArticle = {
  id?: string
  title: string
  thumbnail_url: string
  content: string
  xp_reward: number
  ambicoins_reward: number
  views: number
  author_id: string
  created_at: Date
  updated_at: Date
}

export class Article {
  public readonly id?: string
  public readonly title: string
  public thumbnail_url: string
  public readonly content: string
  public readonly xp_reward: number
  public readonly ambicoins_reward: number
  public readonly views: number
  public readonly author_id: string
  public readonly created_at: Date
  public readonly updated_at: Date

  constructor(data: TArticle) {
    this.id = data.id
    this.title = data.title
    this.thumbnail_url = data.thumbnail_url
    this.content = data.content
    this.xp_reward = data.xp_reward
    this.ambicoins_reward = data.ambicoins_reward
    this.views = data.views
    this.author_id = data.author_id
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}
