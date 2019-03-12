const { ramdaless, get } = require('../src/index')

const helloWorld = get('/*', (res, req) => {
  res.end('HELLO WORLD')
})

ramdaless({
  routes: [helloWorld]
})
