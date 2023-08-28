import { PrismaClient } from '@prisma/client'

import { HeroContract } from '@/application/contracts'
import { Hero } from '@/domain/models'

export class PrismaHeroRepository implements HeroContract {
  private readonly _prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this._prisma = prisma
  }

  async findAll(): Promise<Hero[]> {
    const found = await this._prisma.hero.findMany()
    return found
  }

  async create(hero: Hero): Promise<Hero> {
    const created = await this._prisma.hero.create({
      data: hero,
    })

    return created
  }
}
