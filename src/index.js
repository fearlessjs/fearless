'use strict'

const uWebSockets = require('uWebSockets.js')
const { equals, map, type, includes, ...rest } = require('ramda')
const stringify = require('fast-json-stringify')
const simdjson = require('simdjson')

const { getBody } = require('./json')

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

const ramdaless = ({ ssl, routes, listen }) => {
  try {
    const app = uWebSockets.App(
      ssl
        ? {
          key_file_name: ssl.key,
          cert_file_name: ssl.cert,
          passphrase: ssl.passphrase
        }
        : {}
    )

    const createRoute = route => {
      if (equals(route.type, HTTP.WEB_SOCKET)) {
        app.ws(route.pattern, {
          ...route.options,
          ...route.handlers
        })
      }
      if (equals(route.type, HTTP.GET)) {
        app.get(route.pattern, (res, req) =>
          route.handler(
            {
              ...res,
              end: body =>
                res.end(
                  includes(type(body), ['Object', 'Array'])
                    ? JSON.stringify(body)
                    : body
                )
            },
            req
          )
        )
      }
      if (equals(route.type, HTTP.POST)) {
        app.post(route.pattern, (res, req) =>
          route.handler(
            {
              ...res,
              body: getBody(res),
              end: body =>
                res.end(
                  includes(type(body), ['Object', 'Array'])
                    ? JSON.stringify(body)
                    : body
                )
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

    const port = listen && listen.port ? listen.port : 3000

    const listening = token => {
      if (token) {
        console.log(`Connection successful, go to http://localhost:${port}`)
      } else {
        console.log(
          `Problems connecting to port ${port}, to solve the problem execute the command below`
        )
      }
    }

    const handler = listen && listen.handler ? listen.handler : listening

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
  ...rest,
  equals,
  map,
  type
}
