import { PrismaClient } from '@prisma/client'

import { DifficultyContract } from '@/application/contracts'
import { Difficulty } from '@/domain/models'

export class PrismaDifficultyRepository implements DifficultyContract {
  private readonly _prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this._prisma = prisma
  }

  async findAll(): Promise<Difficulty[]> {
    const foundDifficulties = await this._prisma.difficulty.findMany()
    return foundDifficulties
  }

  async create(difficulty: Difficulty): Promise<Difficulty> {
    const createdDifficulty = await this._prisma.difficulty.create({
      data: difficulty,
    })

    return createdDifficulty
  }
}
