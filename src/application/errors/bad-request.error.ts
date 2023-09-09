import { BaseError } from '@/application/errors'

export class BadRequestError extends BaseError {
  constructor(message = 'Solicitação inválida.') {
    super(message)
  }

  get statusCode(): number {
    return 400
  }
}
