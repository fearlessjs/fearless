const { getResponse } = require('./utils')

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

const setHandler = app => ({ pattern, type, handler, options, handlers }) => {
  switch (type) {
    case HTTP.WEB_SOCKET:
      app.ws(pattern, {
        ...options,
        ...handlers
      })
      break
    case HTTP.GET:
      app.get(pattern, (res, req) => handler(req, getResponse(res)))
  }

  //   if (equals(type, HTTP.POST)) {
  //     app.post(pattern, (res, req) => {
  //       let body
  //       bodyParser(res, json => {
  //         console.log('JSON', json)
  //         body = json
  //         const newRes = {
  //           body,
  //           end: (statusCode, body) => {
  //             res.writeStatus(statusCode.toString() || '200')
  //             res.end(body)
  //           }
  //         }
  //         handler(req, newRes)
  //       })
  //     })
  //   }
}

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
  ws,
  setHandler
}
