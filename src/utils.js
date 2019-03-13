const { equals, type, includes } = require('ramda')

const isObjectOrArray = body => includes(type(body), ['Object', 'Array'])
const isArray = param => equals(type(param), 'Array')

const basicHandler = (res, req, handler) =>
  handler(
    {
      end: body => res.end(isObjectOrArray(body) ? JSON.stringify(body) : body)
    },
    req
  )

const getRequest = (req, body) => ({
  body,
  query: []
})

const getResponse = res => ({
  end: (statusCode, body) => {
    res.writeStatus(statusCode.toString() || '200')
    res.end(body)
  }
})

const getSSLDefault = ssl =>
  ssl
    ? {
      key_file_name: ssl.keyFileName,
      cert_file_name: ssl.certFileName,
      passphrase: ssl.passphrase,
      dh_params_file_name: ssl.dhParamsFileName
    }
    : {}

const getListenDefault = ({ handler, port = 3000 }) => token => {
  if (token) {
    handler ? handler() : console.log('sucess')
  } else {
    console.log(
      `Problems connecting to port ${port}, to solve the problem execute the command below`
    )
  }
}
const getOptions = options => ({
  ssl: {},
  cors: null,
  handlers: options,
  listen: {
    port: 3000,
    handler: null
  },
  ...options
})

module.exports = {
  isObjectOrArray,
  isArray,
  basicHandler,
  getRequest,
  getResponse,
  getSSLDefault,
  getOptions,
  getListenDefault
}
