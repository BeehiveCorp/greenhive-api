type TUser = {
  id?: string
  name: string
  email: string
}

export class User {
  public readonly _id: string | undefined
  public readonly _name: string
  public readonly _email: string

  constructor({ email, name, id }: TUser) {
    this._id = id
    this._name = name
    this._email = email
  }
}
