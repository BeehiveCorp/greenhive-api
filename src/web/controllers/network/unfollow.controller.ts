/* eslint-disable camelcase */

import { FastifyReply, FastifyRequest } from 'fastify'

import { Network } from '@/domain/models'

import { NetworkContract } from '@/application/contracts'

import { UnfollowUseCase } from '@/application/usecases/network'
import { BaseError } from '@/application/errors'
import { ResponseHandler } from '@/web/utils'

export const unfollowController = (networkRepository: NetworkContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as Network

      const useCase = new UnfollowUseCase(networkRepository)

      await useCase.execute(id)

      return reply.send('')
    } catch (error) {
      ResponseHandler.error(reply, error as BaseError)
    }
  }
}
