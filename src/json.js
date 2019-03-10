const stringify = require('fast-json-stringify')
const simdjson = require('simdjson')

const parseJSON = simdjson.parse
const isValidJSON = simdjson.isValid

module.exports = {
  parseJSON,
  isValidJSON,
  stringify
}
