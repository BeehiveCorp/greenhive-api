import { BaseError } from '@/application/errors'

export class ForbiddenError extends BaseError {
  constructor(message = 'Acesso proibido.') {
    super(message)
  }

  get statusCode(): number {
    return 403
  }
}
