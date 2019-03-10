const HTTP = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DEL: 'DEL',
  OPTIONS: 'OPTIONS',
  PATCH: 'PATCH',
  HEAD: 'HEAD',
  CONNECT: 'CONNECT',
  TRACE: 'TRACE',
  ANY: 'ANY',
  WEB_SOCKET: 'WEB_SOCKET'
})

const get = (pattern, handler) => ({ type: HTTP.GET, pattern, handler })
const post = (pattern, handler) => ({ type: HTTP.POST, pattern, handler })
const put = (pattern, handler) => ({ type: HTTP.PUT, pattern, handler })
const del = (pattern, handler) => ({ type: HTTP.DEL, pattern, handler })
const options = (pattern, handler) => ({ type: HTTP.OPTIONS, pattern, handler })
const patch = (pattern, handler) => ({ type: HTTP.PATCH, pattern, handler })
const head = (pattern, handler) => ({ type: HTTP.HEAD, pattern, handler })
const connect = (pattern, handler) => ({ type: HTTP.CONNECT, pattern, handler })
const trace = (pattern, handler) => ({ type: HTTP.TRACE, pattern, handler })
const any = (pattern, handler) => ({ type: HTTP.ANY, pattern, handler })
const ws = (pattern, options, handlers) => ({
  type: HTTP.WEB_SOCKET,
  pattern,
  options,
  handlers
})

module.exports = {
  HTTP,
  get,
  post,
  put,
  del,
  options,
  patch,
  head,
  connect,
  trace,
  any,
  ws
}
