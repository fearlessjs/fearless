'use strict'

const { HTTP } = require('./constants')

const isObjectOrArray = body => typeof body === 'object' || Array.isArray(body)
const isArray = param => Array.isArray(param)

const getRequest = (req, body) => {
  req.body = body
  return req
}

const getSSLDefault = ssl =>
  ssl
    ? {
      key_file_name: ssl.keyFileName,
      cert_file_name: ssl.certFileName,
      passphrase: ssl.passphrase,
      dh_params_file_name: ssl.dhParamsFileName
    }
    : {}

const getListenDefault = ({ handler, port = 3000 }) => token => {
  if (token) {
    if (handler) {
      handler()
    }
  } else {
    console.log(
      `Problems connecting to port ${port}, to solve the problem execute the command below`
    )
  }
}
const getOptions = options => ({
  ssl: {},
  cors: null,
  handlers: options,
  listen: {
    port: 3000,
    handler: null
  },
  ...options
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

module.exports = {
  isObjectOrArray,
  isArray,
  getSSLDefault,
  getOptions,
  getListenDefault,
  getMethods,
  getRequest
}
