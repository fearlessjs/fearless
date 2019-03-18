const { isObjectOrArray } = require('./utils')

const send = (res, statusCode, data) => {
  res.writeStatus(statusCode.toString())
  res.end(isObjectOrArray(data) ? JSON.stringify(data) : data)
}

const sendError = (res, statusCode, message = null, stack = null) => {
  res.writeStatus(statusCode.toString())
  res.end(JSON.stringify({ message, stack }))
}

const sendAsync = async (res, statusCode, handler) => {
  res.onAborted(() => {
    res.aborted = true
  })

  let data = await handler()

  if (!res.aborted) {
    if (data.error) {
      res.writeStatus(data.statusCode.toString() || 500)
      res.end({ message: data.message, stack: data.stack })
      return
    }

    res.writeStatus(statusCode.toString() || 200)
    res.end(isObjectOrArray(data) ? JSON.stringify(data) : data)
  }
}

module.exports = {
  send,
  sendAsync,
  sendError
}
