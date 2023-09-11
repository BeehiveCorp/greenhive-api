import { PrismaClient } from '@prisma/client'

import { UserContract } from '@/application/contracts'
import { User } from '@/domain/models'

export class PrismaUserRepository implements UserContract {
  private readonly _prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this._prisma = prisma
  }

  async update(user: User): Promise<User> {
    const updated = await this._prisma.user.update({
      where: { id: user.id },
      data: user,
    })

    return updated
  }

  async findAll(): Promise<User[]> {
    const foundUsers = await this._prisma.user.findMany()
    return foundUsers
  }

  async create(user: User): Promise<User> {
    const createdUser = await this._prisma.user.create({ data: user })
    return createdUser
  }

  async findByEmail(email: string): Promise<User | null> {
    const userFound: User | null = await this._prisma.user.findFirst({
      where: { email },
      include: {
        hero: true,
      },
    })

    return userFound
  }

  async findById(id: string): Promise<User | null> {
    const userFound: User | null = await this._prisma.user.findUnique({
      where: { id },
    })

    return userFound
  }

  async findByUsername(username: string): Promise<User | null> {
    const found: User | null = await this._prisma.user.findFirst({
      where: { username },
    })

    return found
  }
}
