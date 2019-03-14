// const { parseJSON } = require('./json')

const bodyParser = (res, cb) => {
  let buffer
  /* Register data cb */
  res.onData((ab, isLast) => {
    let chunk = Buffer.from(ab)
    if (isLast) {
      if (buffer) {
        cb(JSON.parse(Buffer.concat([buffer, chunk])))
      } else {
        cb(JSON.parse(chunk))
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
  res.onAborted(() => {
    console.log('Ugh!')
  })
}

module.exports.bodyParser = bodyParser
