/* eslint-disable camelcase */

type TDifficulty = {
  id?: string
  name: string
  hex_code: string
  xp_reward: number
  ambicoins_reward: number
  created_at: Date
  updated_at: Date
}

export class Difficulty {
  public readonly id?: string
  public readonly name: string
  public readonly hex_code: string
  public readonly xp_reward: number
  public readonly ambicoins_reward: number
  public readonly created_at: Date
  public readonly updated_at: Date

  constructor(data: TDifficulty) {
    this.id = data.id
    this.name = data.name
    this.hex_code = data.hex_code
    this.xp_reward = data.xp_reward
    this.ambicoins_reward = data.ambicoins_reward
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}
