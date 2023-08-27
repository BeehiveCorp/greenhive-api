/* eslint-disable camelcase */

type TUser = {
  id?: string
  name: string
  username: string
  email: string
  password: string
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
  public readonly data: TUser

  constructor(data: TUser) {
    this.data = data
  }

  get id(): string | undefined {
    return this.data.id
  }

  get name(): string {
    return this.data.name
  }

  get username(): string {
    return this.data.username
  }

  get email(): string {
    return this.data.email
  }

  get password(): string {
    return this.data.password
  }

  get xp(): number {
    return this.data.xp
  }

  get level(): number {
    return this.data.level
  }

  get avatar_url(): string {
    return this.data.avatar_url
  }

  get ambicoins(): number {
    return this.data.ambicoins
  }

  get permission(): 'COMMON' | 'MANAGER' | 'EMPLOYEE' | 'ADMIN' {
    return this.data.permission
  }

  get company(): string {
    return this.data.company
  }

  get hero(): string {
    return this.data.hero
  }

  get created_at(): string {
    return this.data.created_at
  }

  get updated_at(): string {
    return this.data.updated_at
  }
}
