const { isValid, parse } = require('simdjson')
const { getRequest } = require('./utils')

const json = (res, req, cb, err) => {
  let buffer
  /* Register data cb */
  res.onData((ab, isLast) => {
    let chunk = Buffer.from(ab)
    if (isLast) {
      let json = null
      if (buffer) {
        const concat = Buffer.concat([buffer, chunk])
        json = isValid(concat) ? parse(concat) : {}
        cb(getRequest(req, json), res)
      } else {
        json = isValid(chunk) ? parse(chunk) : {}
        JSON.parse(chunk)
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
}

module.exports = json
