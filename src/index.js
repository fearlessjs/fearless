'use strict'

const uWS = require('uWebSockets.js')
const { getSSLDefault, getListenDefault, getOptions } = require('./utils')

const http = require('./http')

const fearless = options => {
  const { cors, ssl, handlers, listen } = getOptions(options)

  const app = uWS.App(getSSLDefault(ssl))
  handlers.forEach(handler => http.setHandler(app, handler))
  app.listen(listen.port, getListenDefault(listen))
}

module.exports = {
  fearless,
  ...http
}
