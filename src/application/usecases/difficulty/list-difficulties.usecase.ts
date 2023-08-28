import { DifficultyContract } from '@/application/contracts'
import { Difficulty } from '@/domain/models'

interface IListDifficultiesUseCase {
  execute: DifficultyContract['findAll']
}

export class ListDifficultiesUseCase implements IListDifficultiesUseCase {
  private readonly difficultyRepository: DifficultyContract

  constructor(difficultyRepository: DifficultyContract) {
    this.difficultyRepository = difficultyRepository
  }

  async execute(): Promise<Difficulty[]> {
    const difficulties = await this.difficultyRepository.findAll()
    return difficulties
  }
}
