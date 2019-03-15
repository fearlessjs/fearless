const json = (res) => {
  let buffer

  res.onData((ab, isLast) => {
    let chunk = Buffer.from(ab)
    if (isLast) {
      let json
      if (buffer) {
        try {
          json = JSON.parse(Buffer.concat([buffer, chunk]))
        } catch (e) {
          res.close()
          return
        }
        return json
      } else {
        try {
          json = JSON.parse(chunk)
        } catch (e) {
          res.close()
          return
        }
        return json
      }
    } else {
      if (buffer) {
        buffer = Buffer.concat([buffer, chunk])
      } else {
        buffer = Buffer.concat([chunk])
      }
    }
  })

  res.onAborted(() => {
    console.error('JSON invalid')
  })
}

module.exports = json
