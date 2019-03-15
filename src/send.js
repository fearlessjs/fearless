const { isObjectOrArray } = require('./utils')

const send = async (res, statusCode, data) => {
  res.writeStatus(statusCode.toString())
  res.end(isObjectOrArray(data) ? JSON.stringify(data) : data)
}

const sendAsync = async (res, statusCode, handler) => {
  res.onAborted(() => {
    res.aborted = true
  })

  let data = await handler()

  if (!res.aborted) {
    res.writeStatus(statusCode.toString())
    res.end(isObjectOrArray(data) ? JSON.stringify(data) : data)
  }
}

module.exports = {
  send,
  sendAsync
}
