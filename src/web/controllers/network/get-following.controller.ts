/* eslint-disable camelcase */

import { FastifyReply, FastifyRequest } from 'fastify'

import { NetworkContract, UserContract } from '@/application/contracts'

import { ListFollowingUseCase } from '@/application/usecases/network'
import { ResponseHandler } from '@/web/utils'
import { BaseError } from '@/application/errors'

export const getFollowingController = (
  networkRepository: NetworkContract,
  userRepository: UserContract,
) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string }

      const useCase = new ListFollowingUseCase(
        networkRepository,
        userRepository,
      )

      const following = await useCase.execute(id)

      return reply.send(following)
    } catch (error) {
      ResponseHandler.error(reply, error as BaseError)
    }
  }
}
