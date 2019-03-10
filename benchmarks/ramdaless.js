const { ramdaless, get } = require('../src/index')

const helloWorld = get('/', (res, req) => {
  res.end('Hello, World!')
})

ramdaless({
  routes: [helloWorld]
})
