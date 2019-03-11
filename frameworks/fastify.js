const fastify = require('fastify')()

fastify.get('/', (req, rep) => {
  rep.send('Hello, world!')
})

fastify.get('/small', (req, rep) => {
  const small = require('../jsons/example1.json')
  rep.send(small)
})

fastify.get('/big', (req, rep) => {
  const big = require('../jsons/example2.json')
  rep.send(big)
})

fastify.listen(3000, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})
