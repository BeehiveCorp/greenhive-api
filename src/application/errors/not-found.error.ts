import { BaseError } from '@/application/errors'

export class NotFoundError extends BaseError {
  constructor(message = 'Recurso não encontrado.') {
    super(message)
  }

  get statusCode(): number {
    return 404
  }
}
