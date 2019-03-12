const { fearless, get } = require('./src')

fearless([
  get('/*', (res, req) => {
    res.end('Hello, World!')
  })
])
