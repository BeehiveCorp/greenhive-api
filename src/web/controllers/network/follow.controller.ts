/* eslint-disable camelcase */

import { FastifyReply, FastifyRequest } from 'fastify'

import { Network } from '@/domain/models'

import { NetworkContract, UserContract } from '@/application/contracts'

import { FollowUseCase } from '@/application/usecases/network'
import { ResponseHandler } from '@/web/utils'
import { BaseError } from '@/application/errors'

export const followController = (
  networkRepository: NetworkContract,
  userRepository: UserContract,
) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { follower_id, following_id } = request.body as Network

      const useCase = new FollowUseCase(networkRepository, userRepository)

      await useCase.execute(follower_id, following_id)

      return reply.send('')
    } catch (error) {
      ResponseHandler.error(reply, error as BaseError)
    }
  }
}
