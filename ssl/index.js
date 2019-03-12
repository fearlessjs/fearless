module.exports = (configs = {}) => handlers => ({
  ssl: {
    key: 'test',
    cert: 'test2',
    passphrase: 'test3'
  },
  handlers
})
