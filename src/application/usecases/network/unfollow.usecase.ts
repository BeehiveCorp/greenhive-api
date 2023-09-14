/* eslint-disable camelcase */
import { NetworkContract } from '@/application/contracts'

import { BadRequestError, NotFoundError } from '@/application/errors'

interface IFollowUseCase {
  execute: (network_id?: string) => Promise<void>
}

export class UnfollowUseCase implements IFollowUseCase {
  private readonly networkRepository: NetworkContract

  constructor(networkRepository: NetworkContract) {
    this.networkRepository = networkRepository
  }

  async execute(network_id?: string): Promise<void> {
    if (!network_id) throw new BadRequestError('O id da conexão é obrigatório.')

    const network = await this.networkRepository.findById(network_id)

    if (!network) throw new NotFoundError('Conexão não encontrada.')

    await this.networkRepository.delete(network)
  }
}
