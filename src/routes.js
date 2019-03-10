const { equals, includes, type } = require('ramda')
const { HTTP } = require('./verbs')

const isObjectOrArray = body => includes(type(body), ['Object', 'Array'])

const getRequest = (req, body) => ({
  body,
  query: []
})

const getResponse = res => ({
  end: (statusCode, body) => {
    res.writeStatus(statusCode.toString() || '200')
    res.end(body)
  }
})

const basicHandler = (res, req, handler) =>
  handler(
    {
      end: body => res.end(isObjectOrArray(body) ? JSON.stringify(body) : body)
    },
    req
  )

module.exports = (app, { pattern, type, handler, options, handlers }) => {
  if (equals(type, HTTP.WEB_SOCKET)) {
    app.ws(pattern, {
      ...options,
      ...handlers
    })
  }
  if (equals(type, HTTP.GET)) {
    app.get(pattern, (res, req) => basicHandler(res, req, handler))
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
  if (equals(type, HTTP.PUT)) {
    app.put(pattern, handler)
  }
  if (equals(type, HTTP.DEL)) {
    app.del(pattern, handler)
  }
  if (equals(type, HTTP.ANY)) {
    app.any(pattern, handler)
  }
}
