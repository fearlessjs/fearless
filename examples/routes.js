'use strict'

const { ramdaless, get, post, put, del } = require('../src/index')

let people = ['Antonio', 'Regina', 'Márcio', 'Rodrigo', 'Kelly']

const getPeople = get('/people', (res, req) => {
  res.end(people)
})

const postPeople = post('/people', (res, req) => {
  const name = req.getParameters[0]
  people = [...people, name]
  res.end(people)
})

// const putPeople = put('/people/:name', (res, req) => {
//   people =

//   res.end('HELLO WORLD')
// })

// const delPeople = del('/hello-world', (res, req) => {
//   res.end('HELLO WORLD')
// })

ramdaless({
  routes: [getPeople, postPeople],
  ssl: {},
  listen: {}
})
