import { BaseError } from '@/application/errors'

export class ValidationError extends BaseError {
  constructor(message = 'Erro de validação.') {
    super(message)
  }

  get statusCode(): number {
    return 422
  }
}
