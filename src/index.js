'use strict'

const uWebSockets = require('uWebSockets.js')
const { equals, map, type, includes, ...rest } = require('ramda')

const { stringify, parseJSON, isValidJSON } = require('./json')
const { bodyParser } = require('./body')
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
} = require('./verbs')

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
