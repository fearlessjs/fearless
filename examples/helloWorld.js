const { ramdaless, get, pipe, post, type, equals } = require('../src/index')

const ssl = configs => {
  const ssl = {
    key: 'test',
    cert: 'test2',
    passphrase: 'test3'
  }

  if (equals(type(configs), 'Array')) {
    return {
      handlers: configs,
      ssl
    }
  }

  return {
    ...configs,
    ssl
  }
}

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
