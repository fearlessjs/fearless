const { ramdaless, get, pipe, post } = require('../src/index')
const cors = require('ramdaless-cors')
const ssl = require('ramdaless-ssl')

pipe(
  cors,
  ssl,
  ramdaless
)([
  get('/*', (res, req) => {
    res.end('HELLO WORLD')
  }),
  post('/*', (res, req) => {
    res.end('HELLO WORLD')
  })
])
