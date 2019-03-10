const micro = require('micro')

const server = micro((req, res) => 'Hello, world!')

server.listen(3000)
