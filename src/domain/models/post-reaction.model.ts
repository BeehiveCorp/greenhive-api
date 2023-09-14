type TPostReaction = {
  id?: string
  user_id: string
  post_id: string
  created_at: Date
  updated_at: Date
}

export class PostReaction {
  public readonly id?: string
  public readonly user_id: string
  public readonly post_id: string
  public readonly created_at: Date
  public readonly updated_at: Date

  constructor(data: TPostReaction) {
    this.id = data.id
    this.user_id = data.user_id
    this.post_id = data.post_id
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}
