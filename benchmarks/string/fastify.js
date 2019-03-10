const fastify = require('fastify')()

fastify.get('/', (req, rep) => {
  rep.send('Hello, world!')
})

fastify.listen(3000, (err, address) => {
  if (err) throw err
  fastify.log.info(`server listening on ${address}`)
})
