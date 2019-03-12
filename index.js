const { fearless, get } = require('./src')

fearless([
  get('/test', (res, req) => {
    res.end('TESTE!')
  }),
  get('/*', (res, req) => {
    res.end('Hello, World!')
  })
])
