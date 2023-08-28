import { FastifyReply, FastifyRequest } from 'fastify'

import { Difficulty } from '@/domain/models'

import { DifficultyContract } from '@/application/contracts'
import { CreateDifficultyUseCase } from '@/application/usecases/difficulty'

export const createDifficultyController = (
  prismaRepository: DifficultyContract,
) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const data = request.body as Difficulty

    const difficulty = new Difficulty(data)

    const createDifficultyUseCase = new CreateDifficultyUseCase(
      prismaRepository,
    )

    console.log('createDifficultyController')

    const createdDifficulty = await createDifficultyUseCase.execute(difficulty)

    return reply.send(createdDifficulty)
  }
}
