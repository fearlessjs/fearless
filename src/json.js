const { parseJSON } = require('./index')

const getBody = (res, err) => {
  let buffer
  let json
  /* Register data cb */
  res.onData((ab, isLast) => {
    let chunk = Buffer.from(ab)
    if (isLast) {
      if (buffer) {
        try {
          json = parseJSON(Buffer.concat([buffer, chunk]))
        } catch (e) {
          /* res.close calls onAborted */
          res.close()
        }
      } else {
        try {
          json = parseJSON(chunk)
        } catch (e) {
          /* res.close calls onAborted */
          res.close()
        }
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

  console.log('HUDASUHDASHUD', json)

  return json
}

module.exports.getBody = getBody
