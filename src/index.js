'use strict'

const uWS = require('uWebSockets.js')
const { getSSLDefault, getListenDefault, getOptions } = require('./utils')

const http = require('./http')
const { sendAsync, send } = require('./send')

/**
 *
 * @param {Object} options
 * @param {Array<Function>} options.handlers
 * @param {Object} options.listen
 * @param {number=} options.listen.port
 * @param {Function=} options.listen.handler
 * @param {Object} options.ssl
 * @param {string=} options.ssl.keyFileName
 * @param {string=} options.ssl.certFileName
 * @param {string=} options.ssl.passphrase
 * @param {string=} options.ssl.dhParamsFileName
 * @param {Array<Function>=} options.middlewares
 */
const fearless = options => {
  const { ssl, handlers = [], listen, middlewares = [] } = getOptions(options)

  console.log('DIASUHDAUSHD XXX', ssl, handlers, listen, middlewares)

  const app = uWS.App(getSSLDefault(ssl))
  handlers.forEach(handler => http.setHandler(app, handler, middlewares))
  app.listen(listen.port, getListenDefault(listen))
}

module.exports = {
  fearless,
  ...http,
  send,
  sendAsync
}
