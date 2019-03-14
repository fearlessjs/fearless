'use strict'

const { HTTP } = require('./constants')

const isObjectOrArray = body => ['Object', 'Array'].includes(typeof body)
const isArray = param => Array.isArray(param)

const getResponse = res => ({
  send: (...params) => {
    if (params.length > 1) {
      res.writeStatus(params[0].toString())
      res.end(JSON.stringify(params[1]))
      return
    }
    res.end(JSON.stringify(params[0]))
  }
})

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
    handler ? handler() : console.log('sucess')
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
      method: HTTP.WEB_SOCKET,
      pattern,
      options,
      handlers
    })
    : (pattern, handler) => ({ method: HTTP[method], pattern, handler })

module.exports = {
  isObjectOrArray,
  isArray,
  getResponse,
  getSSLDefault,
  getOptions,
  getListenDefault,
  getMethods
}
