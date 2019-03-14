const send = async (statusCode, data, res) => {
  if (statusCode) {
    res.writeStatus(statusCode.toString())
  }
  res.end(JSON.stringify(data))
}

const sendAsync = async (statusCode = 200, f, res) => {
  res.onAborted(() => {
    res.aborted = true
  })

  let result = await f()

  if (!res.aborted) {
    res.writeStatus(statusCode.toString())
    res.end(JSON.stringify(result))
  }
}

module.exports = {
  send,
  sendAsync
}
