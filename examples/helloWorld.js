'use strict'

const { ramdaless, get } = require('../src/index')

const helloWorld = get('/hello-world', (res, req) => {
  res.end('HELLO WORLD')
})

ramdaless({
  routes: [helloWorld]
})
