/* eslint-disable camelcase */
import { FastifyReply, FastifyRequest } from 'fastify'

import { UserContract } from '@/application/contracts'
import { BaseError } from '@/application/errors'
import { UpdateGamifiedStatsUseCase } from '@/application/usecases/user'

import { ResponseHandler } from '@/web/utils'

export const updateGamifiedStatsController = (
  prismaUserRepository: UserContract,
) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { user_id, ambicoins_gains, xp_gains } = request.body as {
        user_id: string
        ambicoins_gains: number
        xp_gains: number
      }

      const useCase = new UpdateGamifiedStatsUseCase(prismaUserRepository)
      const user = await useCase.execute(user_id, xp_gains, ambicoins_gains)

      return reply.status(200).send(user)
    } catch (error) {
      ResponseHandler.error(reply, error as BaseError)
    }
  }
}
