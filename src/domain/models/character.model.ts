/* eslint-disable camelcase */

type TCharacter = {
  id?: string
  name: string
  description: string
  avatar_url: string | null
  created_at: Date
  updated_at: Date
}

export class Character {
  public readonly id?: string
  public readonly name: string
  public readonly description: string
  public avatar_url: string | null
  public readonly created_at: Date
  public readonly updated_at: Date

  constructor(data: TCharacter) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.avatar_url = data.avatar_url
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}
