type TUser = {
  id?: string
  name: string
  email: string
}

export class User {
  public readonly id: string | undefined
  public readonly name: string
  public readonly email: string

  constructor({ email, name, id }: TUser) {
    this.id = id
    this.name = name
    this.email = email
  }
}
