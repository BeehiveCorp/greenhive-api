export abstract class BaseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }

  abstract get statusCode(): number

  toJson(): { error: string; statusCode: number } {
    return { error: this.message, statusCode: this.statusCode }
  }
}
