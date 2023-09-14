type TNetwork = {
  id?: string
  follower_id: string
  following_id: string
  created_at: Date
  updated_at: Date
}

export class Network {
  public readonly id?: string
  public readonly follower_id: string
  public readonly following_id: string
  public readonly created_at: Date
  public readonly updated_at: Date

  constructor(data: TNetwork) {
    this.id = data.id
    this.follower_id = data.follower_id
    this.following_id = data.following_id
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}
