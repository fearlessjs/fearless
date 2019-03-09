'use strict'

const {
  ramdaless,
  get,
  post,
  stringify,
  fastStringify
} = require('../src/index')

const handler = token => {
  if (token) {
    console.log('OK')
  } else {
    console.log('ERROR')
  }
}

const routes = [
  get('/hello-world', (res, req) => {
    // res.send('HELLO WORLD')
    res.end('HELLO WORLD')
  }),
  post('/hello-world', (res, req) => {
    // res.send('HELLO WORLD')

    res.end(
      fastStringify({
        firstName: 'Rodrigo',
        mediumName: 'Oler Batista',
        lastName: 'Silva',
        age: 25,
        gender: 'male'
      })
    )

    // res.end(
    //   stringify({
    //     firstName: 'Rodrigo',
    //     mediumName: 'Oler Batista',
    //     lastName: 'Silva',
    //     age: 25,
    //     gender: 'male'
    //   })
    // )
  })
]

ramdaless({
  ssl: {},
  routes,
  listen: {
    port: 3000,
    handler
  }
})
