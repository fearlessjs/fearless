'use strict'

const { ramdaless, get } = require('../src/index')
// const ssl = require('./ssl')
// const options = require('./options')

get('/sign-in', (res, _req) => {
  res.end('SIGN-IN!')
})

ramdaless({
  // key_file_name: 'misc/key.pem',
  // cert_file_name: 'misc/cert.pem',
  // passphrase: '1234'
}).listen(3000)

//   token => {
//     if (token) {
//       console.log('Listening to port ' + 3000)
//     } else {
//       console.log('Failed to listen to port ' + 3000)
//     }
//   }
