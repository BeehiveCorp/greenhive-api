/* eslint-disable camelcase */

type TUser = {
  id?: string
  name: string
  username: string
  email: string
  password?: string | null
  xp: number
  level: number
  avatar_url: string
  ambicoins: number
  permission: 'COMMON' | 'MANAGER' | 'EMPLOYEE' | 'ADMIN'
  company: string
  hero: string
  created_at: string
  updated_at: string
}

export class User {
  public readonly id?: string
  public readonly name: string
  public readonly username: string
  public readonly email: string
  public password?: string | null
  public readonly xp: number
  public readonly level: number
  public readonly avatar_url: string
  public readonly ambicoins: number
  public readonly permission: 'COMMON' | 'MANAGER' | 'EMPLOYEE' | 'ADMIN'
  public readonly company: string
  public readonly hero: string
  public readonly created_at: string
  public readonly updated_at: string

  constructor({
    id,
    name,
    username,
    email,
    password,
    xp,
    level,
    avatar_url,
    ambicoins,
    permission,
    company,
    hero,
    created_at,
    updated_at,
  }: TUser) {
    this.id = id
    this.name = name
    this.username = username
    this.email = email
    this.password = password
    this.xp = xp
    this.level = level
    this.avatar_url = avatar_url
    this.ambicoins = ambicoins
    this.permission = permission
    this.company = company
    this.hero = hero
    this.created_at = created_at
    this.updated_at = updated_at
  }
}
