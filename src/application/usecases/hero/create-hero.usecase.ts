import { HeroContract } from '@/application/contracts'
import { Hero } from '@/domain/models'

interface ICreateHeroUseCase {
  execute: HeroContract['create']
}

export class CreateHeroUseCase implements ICreateHeroUseCase {
  private readonly heroRepository: HeroContract

  constructor(heroRepository: HeroContract) {
    this.heroRepository = heroRepository
  }

  async execute(hero: Hero): Promise<Hero> {
    const created = await this.heroRepository.create(hero)
    return created
  }
}
