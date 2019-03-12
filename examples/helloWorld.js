const { ramdaless, get, pipe, post } = require('../src/index')
const cors = require('../cors')
const ssl = require('../ssl')

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
