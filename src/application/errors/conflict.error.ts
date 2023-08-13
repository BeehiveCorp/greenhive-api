import { BaseError } from '@/application/errors'

export class ConflictError extends BaseError {
  constructor(message = 'Conflito na solicitação.') {
    super(message)
  }

  get statusCode(): number {
    return 409
  }
}
