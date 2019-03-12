module.exports = (
  options = {
    key: '',
    cert: '',
    passphrase: ''
  }
) => handlers =>
  Array.isArray(handlers)
    ? {
      ssl: options,
      handlers
    }
    : { ssl: options, ...handlers }
