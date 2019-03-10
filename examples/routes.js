'use strict'

const { ramdaless, get, post, put, del } = require('../src/index')

let people = ['Antonio', 'Regina', 'Márcio', 'Rodrigo', 'Kelly']

const getPeople = get('/people', (res, req) => {
  res.end(people)
})

const postPeople = post('/people', (req, res) => {
  /* Note that you cannot read from req after returning from here */
  let body = res.body

  console.log('HUDASUHDAUHSD', body)

  res.end(200, 'HELLO WORLD POST')
})

ramdaless({
  routes: [getPeople, postPeople],
  ssl: {},
  listen: {}
})
