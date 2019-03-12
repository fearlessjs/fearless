'use strict'

const uWS = require('uWebSockets.js')
const { equals, map, type, includes, ...rest } = require('ramda')
const { stringify, parseJSON, isValidJSON } = require('./json')
const { getSSLDefault, getListenDefault, getOptions } = require('./utils')

const http = require('./http')

const fearless = (
  options = {
    cors: [],
    ssl: {
      keyFileName: '',
      certFileName: '',
      passphrase: '',
      dhParamsFileName: ''
    },
    handlers: [],
    listen: {
      port: '',
      handler: ''
    }
  }
) => {
  const { cors, ssl, handlers, listen } = getOptions(options)

  console.log(JSON.stringify({ cors, ssl, handlers }, null, 4))

  try {
    const app = uWS.App(getSSLDefault(ssl))
    map(http.setHandler, handlers)
    app.listen(getListenDefault(listen))
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  fearless,
  ...http,
  parseJSON,
  isValidJSON,
  stringify,
  ...rest,
  equals,
  map,
  type
}
