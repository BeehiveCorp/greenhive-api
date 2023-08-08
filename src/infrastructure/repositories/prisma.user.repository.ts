import { PrismaClient } from '@prisma/client'

import { UserContract } from '@/application/contracts'
import { User } from '@/domain/models'

export class PrismaUserRepository implements UserContract {
  private readonly _prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this._prisma = prisma
  }

  async create(user: User): Promise<User> {
    throw new Error('Method not implemented.')
  }

  findByEmail(email: string): Promise<User | undefined> {
    throw new Error('Method not implemented.')
  }
}
