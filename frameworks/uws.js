const uws = require('uWebSockets.js')

uws
  .App({})
  .get('/', (res, req) => {
    res.end('Hello, World!')
  })
  .listen(3000, () => {})
