const HTTP = Object.freeze({
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DEL: 'del',
  OPTIONS: 'options',
  PATCH: 'patch',
  HEAD: 'head',
  CONNECT: 'connect',
  TRACE: 'trace',
  ANY: 'any',
  WEB_SOCKET: 'web_socket'
})

const getMethods = method =>
  method === HTTP.WEB_SOCKET
    ? (pattern, options, handlers) => ({
      method,
      pattern,
      options,
      handlers
    })
    : (pattern, handler) => ({ method, pattern, handler })

const [
  get,
  post,
  put,
  del,
  options,
  patch,
  head,
  connect,
  trace,
  any,
  ws
] = Object.values(HTTP).map(getMethods)

const setHandler = (
  app,
  { pattern, method, handler, options, handlers },
  middlewares
) => {
  if (method === HTTP.WEB_SOCKET) {
    app[method](pattern, {
      ...options,
      ...handlers
    })
  }

  app[method](pattern, (res, req) => {
    middlewares.forEach(m => m(req, res))
    handler(req, res)
  })
}

module.exports = {
  HTTP,
  setHandler,
  get,
  post,
  put,
  del,
  options,
  patch,
  head,
  connect,
  trace,
  any,
  ws
}
