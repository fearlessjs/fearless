const send = (res, statusCode, data) => {
  res.writeStatus(statusCode.toString())
  res.end(
    typeof data === 'object' || Array.isArray(data)
      ? JSON.stringify(data)
      : data.toString()
  )
}

const sendError = (res, statusCode, message, stack) =>
  send(res, statusCode, { message, stack })

const sendAsync = async (res, statusCode, handler) => {
  res.onAborted(() => {
    res.aborted = true
  })

  const data = await handler()

  if (!res.aborted) {
    if (data && data.error) {
      const { message = '', stack = '' } = data.error
      return send(res, statusCode, { message, stack })
    }

    send(res, statusCode, data)
  }
}

module.exports = { send, sendAsync, sendError }
