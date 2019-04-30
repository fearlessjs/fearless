const { fearless, get, send } = require('@fearless/fearless')

const helloWorld = get('/', (req, res) => {
  send(res, 200, 'Hello, World!')
})

fearless([helloWorld])
