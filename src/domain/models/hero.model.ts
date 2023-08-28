/* eslint-disable camelcase */

type THero = {
  id?: string
  name: string
  description: string
  lore: string
  avatar_url: string
  created_at: Date
  updated_at: Date
}

export class Hero {
  public readonly id?: string
  public readonly name: string
  public readonly description: string
  public readonly lore: string
  public avatar_url: string
  public readonly created_at: Date
  public readonly updated_at: Date

  constructor(data: THero) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.lore = data.lore
    this.avatar_url = data.avatar_url
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}
