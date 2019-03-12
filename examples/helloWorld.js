const { ramdaless, get, pipe } = require('../src/index')
const cors = require('../cors')()
const ssl = require('../ssl')()

pipe(
  cors,
  ssl,
  ramdaless
)([
  get('/*', (res, req) => {
    res.end('Hello, World!')
  })
])
