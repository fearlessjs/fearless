'use strict'

const uWebSockets = require('uWebSockets.js')
const port = 3000

uWebSockets
  .SSLApp({
    // key_file_name: 'misc/key.pem',
    // cert_file_name: 'misc/cert.pem',
    // passphrase: '1234'
  })
  .ws('/*', {
    /* Options */
    compression: 0,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 10,
    /* Handlers */
    open: (ws, req) => {
      console.log('A WebSocket connected via URL: ' + req.getUrl() + '!')
    },
    message: (ws, message, isBinary) => {
      /* Ok is false if backpressure was built up, wait for drain */
      let ok = ws.send(message, isBinary)
    },
    drain: ws => {
      console.log('WebSocket backpressure: ' + ws.getBufferedAmount())
    },
    close: (ws, code, message) => {
      console.log('WebSocket closed')
    }
  })
  .any('/*', (res, req) => {
    res.end('Nothing to see here!')
  })
  .listen(port, token => {
    if (token) {
      console.log('Listening to port ' + port)
    } else {
      console.log('Failed to listen to port ' + port)
    }
  })
