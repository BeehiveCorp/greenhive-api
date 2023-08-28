import { FastifyReply, FastifyRequest } from 'fastify'

import { Character } from '@/domain/models'

import { CharacterContract } from '@/application/contracts'
import { CreateCharacterUseCase } from '@/application/usecases/character'

export const createCharacterController = (repository: CharacterContract) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const data = request.body as Character

    const character = new Character(data)

    const useCase = new CreateCharacterUseCase(repository)

    const created = await useCase.execute(character)

    return reply.send(created)
  }
}
