import { BaseError } from '@/application/errors'

export class NotImplementedError extends BaseError {
  constructor(message = 'Funcionalidade não implementada.') {
    super(message)
  }

  get statusCode(): number {
    return 501
  }
}
