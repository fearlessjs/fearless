const { getRequest } = require('./utils')

const json = (res, req, cb, err) => {
  let buffer
  /* Register data cb */
  res.onData((ab, isLast) => {
    let chunk = Buffer.from(ab)
    if (isLast) {
      let json
      if (buffer) {
        try {
          json = JSON.parse(Buffer.concat([buffer, chunk]))
        } catch (e) {
          /* res.close calls onAborted */
          res.close()
          return
        }
        cb(getRequest(req, json), res)
      } else {
        try {
          json = JSON.parse(chunk)
        } catch (e) {
          /* res.close calls onAborted */
          res.close()
          return
        }
        cb(getRequest(req, json), res)
      }
    } else {
      if (buffer) {
        buffer = Buffer.concat([buffer, chunk])
      } else {
        buffer = Buffer.concat([chunk])
      }
    }
  })

  /* Register error cb */
  res.onAborted(err)
}

module.exports = json
