import { Conflict } from '../lib/errors/Conflict'
import { NotFound } from '../lib/errors/NotFound'
import { Unauthenticated } from '../lib/errors/Unauthenticated'
import { Unauthorized } from '../lib/errors/Unauthorized'
const { ValidationError } = require('express-json-validator-middleware')

export function errorMiddleware (
  error: any,
  request: any,
  response: any,
  next: any
) {
  if (response.headersSent) {
    return next(error)
  }

  let code, message
  switch (true) {
    case error instanceof ValidationError:
      code = 400
      break
    case error instanceof Unauthenticated:
      code = 401
      break
    case error instanceof Unauthorized:
      code = 403
      break
    case error instanceof NotFound:
      code = 404
      break
    case error instanceof Conflict:
      code = 409
      break
  }

  if (!code) {
    return next(error)
  }

  if (message) {
    response.status(code).json({ code, message })
  } else {
    response.status(code)
  }

  next()
}
