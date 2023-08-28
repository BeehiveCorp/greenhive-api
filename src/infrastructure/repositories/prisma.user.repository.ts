import { PrismaClient } from '@prisma/client'

import { UserContract } from '@/application/contracts'
import { User } from '@/domain/models'

export class PrismaUserRepository implements UserContract {
  private readonly _prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this._prisma = prisma
  }

  async findAll(): Promise<User[]> {
    const foundUsers = await this._prisma.user.findMany()
    return foundUsers
  }

  async create(user: User): Promise<User> {
    console.log(user)

    const createdUser = await this._prisma.user.create({ data: user.data })
    return createdUser
  }

  async findByEmail(email: string): Promise<User | null> {
    const userFound: User | null = await this._prisma.user.findFirst({
      where: { email },
    })

    return userFound
  }
}
