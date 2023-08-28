import { PrismaClient } from '@prisma/client'

import { CharacterContract } from '@/application/contracts'
import { Character } from '@/domain/models'

export class PrismaCharacterRepository implements CharacterContract {
  private readonly _prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this._prisma = prisma
  }

  async findAll(): Promise<Character[]> {
    const found = await this._prisma.character.findMany()
    return found
  }

  async create(character: Character): Promise<Character> {
    const created = await this._prisma.character.create({
      data: character,
    })

    return created
  }
}
