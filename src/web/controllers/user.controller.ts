import { FastifyReply, FastifyRequest } from 'fastify'
import { ICreateUserUseCase } from '@/application/contracts'
import { User } from '@/domain/models'

export class UserController {
  private readonly _createUserUseCase: ICreateUserUseCase

  constructor(createUserUseCase: ICreateUserUseCase) {
    this._createUserUseCase = createUserUseCase
  }

  createUser = async (req: FastifyRequest, reply: FastifyReply) => {
    const { name, email } = req.body as { name: string; email: string }

    const user = new User({ name, email })

    console.log(JSON.stringify(typeof this._createUserUseCase))

    const createdUser = await this._createUserUseCase.execute(user)

    reply.send(createdUser)
  }
}
