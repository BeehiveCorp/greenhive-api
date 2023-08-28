import { HeroContract } from '@/application/contracts'
import { Hero } from '@/domain/models'

interface IListHeroesUseCase {
  execute: HeroContract['findAll']
}

export class ListHeroesUseCase implements IListHeroesUseCase {
  private readonly heroRepository: HeroContract

  constructor(heroRepository: HeroContract) {
    this.heroRepository = heroRepository
  }

  async execute(): Promise<Hero[]> {
    const heroes = await this.heroRepository.findAll()
    return heroes
  }
}
