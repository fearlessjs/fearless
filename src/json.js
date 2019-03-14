const json = res => {
  let buffer

  return new Promise((resolve, reject) => {
    res.onData((ab, isLast) => {
      let chunk = Buffer.from(ab)
      if (isLast) {
        let json
        if (buffer) {
          try {
            json = JSON.parse(Buffer.concat([buffer, chunk]))
          } catch (e) {
            reject(e)
          }
          resolve(json)
        } else {
          try {
            json = JSON.parse(chunk)
          } catch (e) {
            reject(e)
          }
          resolve(json)
        }
      } else {
        if (buffer) {
          buffer = Buffer.concat([buffer, chunk])
        } else {
          buffer = Buffer.concat([chunk])
        }
      }
    })
  })
}

module.exports = json
