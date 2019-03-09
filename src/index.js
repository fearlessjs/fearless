'use strict'

const uWebSockets = require('uWebSockets.js')
// const ssl = require('./ssl')
// const options = require('./options')

const app = ({ key, cert, passphrase }) =>
  uWebSockets.App({
    // key_file_name: 'misc/key.pem',
    // cert_file_name: 'misc/cert.pem',
    // passphrase: '1234'
  })

// require('./routes')(app)

const get = (path, callback) => app({}).get(path, callback)

module.exports = { app, get }
module.exports.ramdaless = app
module.exports.get = get
