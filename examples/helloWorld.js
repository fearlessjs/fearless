const { ramdaless, get, pipe } = require('../src/index')

const handlers = () => ({
  handlers: [
    get('/*', (res, req) => {
      res.end('HELLO WORLD')
    })
  ]
})

const cors = ({ ...rest }) => ({
  ...rest,
  cors: {
    origin: '*'
  }
})

const ssl = ({ ...rest }) => ({
  ...rest,
  ssl: {
    key: 'test',
    cert: 'test2',
    passphrase: 'test3'
  }
})

pipe(
  handlers,
  cors,
  ssl,
  ramdaless
)()
