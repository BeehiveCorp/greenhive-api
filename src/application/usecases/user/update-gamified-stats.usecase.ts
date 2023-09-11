/* eslint-disable camelcase */
import { LEVEL_UP_DIFFICULTY_FACTOR } from '@/application/constants'
import { UserContract } from '@/application/contracts'
import { NotFoundError } from '@/application/errors'
import { User } from '@/domain/models'

interface IUpdateGamifiedStatsUseCase {
  execute: (
    user_id: string,
    xp_gains: number,
    ambicoins_gains: number,
  ) => Promise<User>
}

export class UpdateGamifiedStatsUseCase implements IUpdateGamifiedStatsUseCase {
  private readonly userRepository: UserContract

  constructor(userRepository: UserContract) {
    this.userRepository = userRepository
  }

  async execute(
    user_id: string,
    xp_gains: number,
    ambicoins_gains: number,
  ): Promise<User> {
    const user = await this.userRepository.findById(user_id)

    if (!user) throw new NotFoundError('Usuário não encontrado.')

    const difficulty = LEVEL_UP_DIFFICULTY_FACTOR.Medium

    const ambicoins = user.ambicoins + ambicoins_gains
    let xp = user.xp + xp_gains
    let level = user.level
    let xpNeeded = Math.pow((level + 1) * difficulty, 2)

    while (xp >= xpNeeded) {
      xp -= xpNeeded
      level++
      xpNeeded = Math.pow((level + 1) * difficulty, 2)
    }

    const updatedUser: User = {
      ...user,
      ambicoins,
      xp,
      level,
    }

    console.log(updatedUser)

    const updated = await this.userRepository.update(updatedUser)

    return updated
  }
}
