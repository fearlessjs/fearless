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

const getSSLDefault = ({
  keyFileName,
  certFileName,
  passphrase,
  dhParamsFileName
}) => ({
  key_file_name: keyFileName,
  cert_file_name: certFileName,
  passphrase,
  dh_params_file_name: dhParamsFileName
})

const getListenDefault = () => {
  const port = listen && listen.port ? listen.port : 3000
  const listening = token => {
    if (token) {
      console.log(`Connection successful, go to http://localhost:${port}`)
    } else {
      console.log(
        `Problems connecting to port ${port}, to solve the problem execute the command below`
      )
    }
  }
  const handler = listen && listen.handler ? listen.handler : listening
  app.listen(port, handler)
}

const getOptions = options =>
  isArray(options)
    ? {
      handlers: options,
      ssl: null,
      cors: null,
      listen: null
    }
    : options

module.exports = {
  isObjectOrArray,
  isArray,
  basicHandler,
  getRequest,
  getResponse,
  getSSLDefault,
  getOptions
}
