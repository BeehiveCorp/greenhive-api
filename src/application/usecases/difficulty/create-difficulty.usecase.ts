import { DifficultyContract } from '@/application/contracts'
import { Difficulty } from '@/domain/models'

interface ICreateDifficultyUseCase {
  execute: DifficultyContract['create']
}

export class CreateDifficultyUseCase implements ICreateDifficultyUseCase {
  private readonly difficultyRepository: DifficultyContract

  constructor(difficultyRepository: DifficultyContract) {
    this.difficultyRepository = difficultyRepository
  }

  async execute(difficulty: Difficulty): Promise<Difficulty> {
    console.log('execute')
    const created = await this.difficultyRepository.create(difficulty)
    return created
  }
}
