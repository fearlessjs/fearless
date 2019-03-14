const { fearless, get } = require('./src')

fearless([
  get('/test', (res, req) => {
    res.end('TESTE!')
  }),
  get('/', (res, req) => {
    const { query } = req

    res.end(JSON.stringify(query))
  })
])
