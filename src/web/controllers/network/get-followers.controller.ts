/* eslint-disable camelcase */

import { FastifyReply, FastifyRequest } from 'fastify'

import { NetworkContract, UserContract } from '@/application/contracts'

import { ListFollowersUseCase } from '@/application/usecases/network'
import { ResponseHandler } from '@/web/utils'
import { BaseError } from '@/application/errors'

export const getFollowersController = (
  networkRepository: NetworkContract,
  userRepository: UserContract,
) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as { id: string }

      const useCase = new ListFollowersUseCase(
        networkRepository,
        userRepository,
      )

      const followers = await useCase.execute(id)

      return reply.send(followers)
    } catch (error) {
      ResponseHandler.error(reply, error as BaseError)
    }
  }
}
