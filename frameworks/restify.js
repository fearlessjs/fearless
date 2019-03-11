const server = require('restify').createServer()

server.get('/', (req, res, next) => {
  res.send('Hello, World!')
  next()
})

server.listen(3000)
