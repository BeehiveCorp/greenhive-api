import { BaseError } from '@/application/errors'

export class InternalServerError extends BaseError {
  constructor(message = 'Erro interno do servidor.') {
    super(message)
  }

  get statusCode(): number {
    return 500
  }
}
