import { Character } from '@/domain/models'

export interface CharacterContract {
  create(difficulty: Character): Promise<Character>
  findAll(): Promise<Character[]>
}
