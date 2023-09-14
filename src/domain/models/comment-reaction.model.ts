type TCommentReaction = {
  id?: string
  user_id: string
  comment_id: string
  created_at: Date
  updated_at: Date
}

export class CommentReaction {
  public readonly id?: string
  public readonly user_id: string
  public readonly comment_id: string
  public readonly created_at: Date
  public readonly updated_at: Date

  constructor(data: TCommentReaction) {
    this.id = data.id
    this.user_id = data.user_id
    this.comment_id = data.comment_id
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}
