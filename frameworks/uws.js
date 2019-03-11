const uws = require('uWebSockets.js')

uws
  .App({})
  .get('/', (res, req) => {
    res.end('Hello, World!')
  })
  .get('/small', (res, req) => {
    const small = require('../jsons/example1.json')
    res.end(JSON.stringify(small))
  })
  .get('/big', (res, req) => {
    const big = require('../jsons/example2.json')
    res.end(JSON.stringify(big))
  })
  .listen(3000, () => {})
