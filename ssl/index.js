module.exports = configs => {
  const ssl = {
    key: 'test',
    cert: 'test2',
    passphrase: 'test3'
  }

  if (typeof configs === 'Array') {
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
