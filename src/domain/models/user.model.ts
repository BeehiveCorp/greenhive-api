type TUser = {
  id?: string
  name: string
  email: string
  password: string
}

export class User {
  public readonly id: string | undefined
  public readonly name: string
  public readonly email: string
  public readonly password: string

  constructor({ email, name, id, password }: TUser) {
    this.id = id
    this.name = name
    this.email = email
    this.password = password
  }
}
