import { CharacterContract } from '@/application/contracts'
import { Character } from '@/domain/models'

interface IListCharactersUseCase {
  execute: CharacterContract['findAll']
}

export class ListCharactersUseCase implements IListCharactersUseCase {
  private readonly characterRepository: CharacterContract

  constructor(characterRepository: CharacterContract) {
    this.characterRepository = characterRepository
  }

  async execute(): Promise<Character[]> {
    const characters = await this.characterRepository.findAll()
    return characters
  }
}
