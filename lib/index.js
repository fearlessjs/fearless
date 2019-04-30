const uWS = require('uWebSockets.js')

const http = require('./http')
const { send, sendAsync, sendError } = require('./send')

const fearless = options => {
  const handlers = options.handlers || options
  const { ssl = null, middlewares = [] } = options

  const app = uWS.App(ssl ? ssl : {})

  handlers.forEach(handler => http.setHandler(app, handler, middlewares))

  app.listen(3000, () => {})
}

module.exports = {
  fearless,
  send,
  sendAsync,
  sendError,
  ...http
}
