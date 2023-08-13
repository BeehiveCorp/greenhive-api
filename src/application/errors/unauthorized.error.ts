import { BaseError } from '@/application/errors'

export class UnauthorizedError extends BaseError {
  constructor(message = 'Acesso não autorizado.') {
    super(message)
  }

  get statusCode(): number {
    return 401
  }
}
