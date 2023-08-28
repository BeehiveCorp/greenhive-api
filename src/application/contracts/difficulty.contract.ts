import { Difficulty } from '@/domain/models'

export interface DifficultyContract {
  create(difficulty: Difficulty): Promise<Difficulty>
  findAll(): Promise<Difficulty[]>
}
