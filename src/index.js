'use strict'

const uWebSockets = require('uWebSockets.js')
const { equals, map, type, includes, ...rest } = require('ramda')

const { stringify, parseJSON, isValidJSON } = require('./json')

const isObjectOrArray = body => includes(type(body), ['Object', 'Array'])

// const getRequest = (req, body) => ({
//   body,
//   query: []
// })

// const getResponse = res => ({
//   end: (statusCode, body) => {
//     res.writeStatus(statusCode.toString() || '200')
//     res.end(body)
//   }
// })

const basicHandler = (res, req, handler) =>
  handler(
    {
      end: body => res.end(isObjectOrArray(body) ? JSON.stringify(body) : body)
    },
    req
  )

const {
  HTTP,
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
  ws
} = require('./http')

const ramdaless = ({ handlers, ssl, cors, listen }) => {
  console.log('UHDSAHUDASUHDUAS', handlers, ssl, cors)

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
    map(({ pattern, type, handler, options, handlers }) => {
      if (equals(type, HTTP.WEB_SOCKET)) {
        app.ws(pattern, {
          ...options,
          ...handlers
        })
      }
      if (equals(type, HTTP.GET)) {
        app.get(pattern, (res, req) => basicHandler(res, req, handler))
      }
      //   if (equals(type, HTTP.POST)) {
      //     app.post(pattern, (res, req) => {
      //       let body
      //       bodyParser(res, json => {
      //         console.log('JSON', json)
      //         body = json
      //         const newRes = {
      //           body,
      //           end: (statusCode, body) => {
      //             res.writeStatus(statusCode.toString() || '200')
      //             res.end(body)
      //           }
      //         }
      //         handler(req, newRes)
      //       })
      //     })
      //   }
      if (equals(type, HTTP.PUT)) {
        app.put(pattern, handler)
      }
      if (equals(type, HTTP.DEL)) {
        app.del(pattern, handler)
      }
      if (equals(type, HTTP.ANY)) {
        app.any(pattern, handler)
      }
    }, handlers)
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
