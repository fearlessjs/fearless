const uWS = require('uWebSockets.js')

const {
  del,
  get,
  options,
  patch,
  post,
  put,
  setHandler,
  ws
} = require('./http')
const { send, sendAsync, sendError } = require('./send')

const fearless = options => {
  const handlers = options.handlers || options
  const { ssl = null, middlewares = [] } = options

  const app = uWS.App(ssl ? ssl : {})

  handlers.forEach(handler => setHandler(app, handler, middlewares))

  app.listen(3000, () => {})
}

module.exports = fearless
exports = fearless
exports.default = fearless

exports.send = send
exports.sendAsync = sendAsync
exports.sendError = sendError

exports.del = del
exports.get = get
exports.options = options
exports.patch = patch
exports.post = post
exports.put = put
exports.ws = ws
