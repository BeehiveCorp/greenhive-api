import { Hero } from '@/domain/models'

export interface HeroContract {
  create(difficulty: Hero): Promise<Hero>
  findAll(): Promise<Hero[]>
}
