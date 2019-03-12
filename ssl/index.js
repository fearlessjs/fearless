module.exports = configs => {
  const ssl = {
    key: 'test',
    cert: 'test2',
    passphrase: 'test3'
  }

  if (Array.isArray(configs)) {
    return {
      handlers: configs,
      ssl
    }
  }

  return {
    ...configs,
    ssl
  }
}
