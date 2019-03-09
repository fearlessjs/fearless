'use strict'

const uWebSockets = require('uWebSockets.js')
const { equals, map, ...rest } = require('ramda')
const stringify = require('fast-json-stringify')
const simdjson = require('simdjson')
// const ssl = require('./ssl')
// const options = require('./options')

const HTTP = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DEL: 'DEL',
  OPTIONS: 'OPTIONS',
  PATCH: 'PATCH',
  HEAD: 'HEAD',
  CONNECT: 'CONNECT',
  TRACE: 'TRACE',
  ANY: 'ANY',
  WEB_SOCKET: 'WEB_SOCKET'
})

const parseJSON = simdjson.parse
const isValidJSON = simdjson.isValid

const get = (pattern, handler) => ({ type: HTTP.GET, pattern, handler })
const post = (pattern, handler) => ({ type: HTTP.POST, pattern, handler })
const put = (pattern, handler) => ({ type: HTTP.PUT, pattern, handler })
const del = (pattern, handler) => ({ type: HTTP.DEL, pattern, handler })
const options = (pattern, handler) => ({ type: HTTP.OPTIONS, pattern, handler })
const patch = (pattern, handler) => ({ type: HTTP.PATCH, pattern, handler })
const head = (pattern, handler) => ({ type: HTTP.HEAD, pattern, handler })
const connect = (pattern, handler) => ({ type: HTTP.CONNECT, pattern, handler })
const trace = (pattern, handler) => ({ type: HTTP.TRACE, pattern, handler })
const any = (pattern, handler) => ({ type: HTTP.ANY, pattern, handler })
const ws = (pattern, options, handlers) => ({
  type: HTTP.WEB_SOCKET,
  pattern,
  options,
  handlers
})

const ramdaless = ({
  ssl: { key, cert, passphrase },
  routes,
  listen: { port, handler }
}) => {
  try {
    const app = uWebSockets.App({
      // key_file_name: 'misc/key.pem',
      // cert_file_name: 'misc/cert.pem',
      // passphrase: '1234'
    })

    const createRoute = route => {
      if (equals(route.type, HTTP.WEB_SOCKET)) {
        app.ws(route.pattern, {
          ...route.options,
          ...route.handlers
        })
      }
      if (equals(route.type, HTTP.GET)) {
        app.get(route.pattern, route.handler)
      }
      if (equals(route.type, HTTP.POST)) {
        app.post(route.pattern, (res, req) =>
          route.handler(
            {
              ...res,
              end: body => res.end(JSON.stringify(body))
            },
            req
          )
        )
      }
      if (equals(route.type, HTTP.PUT)) {
        app.put(route.pattern, route.handler)
      }
      if (equals(route.type, HTTP.DEL)) {
        app.del(route.pattern, route.handler)
      }
      if (equals(route.type, HTTP.ANY)) {
        app.any(route.pattern, route.handler)
      }
    }

    map(createRoute, routes)

    app.listen(port, handler)
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  ramdaless,
  get,
  put,
  del,
  post,
  options,
  patch,
  head,
  connect,
  trace,
  any,
  ws,
  parseJSON,
  isValidJSON,
  stringify,
  ...rest
}
