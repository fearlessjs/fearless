const uWS = require('uWebSockets.js')

const http = require('./http')
const { send, sendAsync, sendError } = require('./send')

const fearless = (handlers, options) => {
  const ssl = null
  const middlewares = []
  
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
