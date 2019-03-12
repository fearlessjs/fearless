const DEFAULT_ALLOW_METHODS = [
  'POST',
  'GET',
  'PUT',
  'PATCH',
  'DELETE',
  'OPTIONS'
]

const DEFAULT_ALLOW_HEADERS = [
  'X-Requested-With',
  'Access-Control-Allow-Origin',
  'X-HTTP-Method-Override',
  'Content-Type',
  'Authorization',
  'Accept'
]

const DEFAULT_MAX_AGE_SECONDS = 60 * 60 * 24

module.exports = (
  options = {
    origin: '*',
    maxAge: DEFAULT_MAX_AGE_SECONDS,
    allowMethods: DEFAULT_ALLOW_METHODS,
    allowHeaders: DEFAULT_ALLOW_HEADERS,
    allowCredentials: true,
    exposeHeaders: []
  }
) => handlers =>
  Array.isArray(handlers)
    ? {
      cors: options,
      handlers
    }
    : { cors: options, ...handlers }
