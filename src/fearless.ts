import uWS from 'uWebSockets.js'

import http from './http'
import { sendAsync, send, sendError } from './send'
import { IFearlessConfig } from './interfaces'

function fearless(config: IFearlessConfig) {
  const {
    ssl = {},
    handlers = [],
    middlewares = [],
    listen: { port = 3000, handler = () => {} }
  } = config

  const app = uWS.App(
    ssl
      ? {
          key_file_name: ssl.keyFileName,
          cert_file_name: ssl.certFileName,
          passphrase: ssl.passphrase,
          dh_params_file_name: ssl.dhParamsFileName
        }
      : {}
  )

  handlers.forEach((handler: Function) =>
    http.setHandler(app, handler, middlewares)
  )

  app.listen(port, handler)
}

export default {
  fearless,
  ...http,
  send,
  sendAsync,
  sendError
}
