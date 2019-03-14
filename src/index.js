'use strict'

const uWS = require('uWebSockets.js')
const { getSSLDefault, getListenDefault, getOptions } = require('./utils')

const http = require('./http')

const fearless = options => {
  const { cors, ssl, handlers, listen } = getOptions(options)

  console.log(JSON.stringify({ cors, ssl, handlers }, null, 4))

  try {
    const app = uWS.App(getSSLDefault(ssl))
    handlers.forEach(http.setHandler(app))
    app.listen(listen.port, getListenDefault(listen))
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  fearless,
  ...http
}
