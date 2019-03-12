const { equals, type, includes } = require('ramda')

const isObjectOrArray = body => includes(type(body), ['Object', 'Array'])
const isArray = param => equals(type(param), 'Array')

const basicHandler = (res, req, handler) =>
  handler(
    {
      end: body => res.end(isObjectOrArray(body) ? JSON.stringify(body) : body)
    },
    req
  )

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

module.exports = {
  isObjectOrArray,
  isArray,
  basicHandler,
  getRequest,
  getResponse
}
