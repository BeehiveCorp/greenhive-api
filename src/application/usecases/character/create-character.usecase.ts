import { CharacterContract } from '@/application/contracts'
import { Character } from '@/domain/models'

interface ICreateCharacterUseCase {
  execute: CharacterContract['create']
}

export class CreateCharacterUseCase implements ICreateCharacterUseCase {
  private readonly characterRepository: CharacterContract

  constructor(characterRepository: CharacterContract) {
    this.characterRepository = characterRepository
  }

  async execute(character: Character): Promise<Character> {
    const created = await this.characterRepository.create(character)
    return created
  }
}
