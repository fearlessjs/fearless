module.exports = configs => {
  const cors = {
    origin: ['*']
  }

  if (typeof configs === 'Array') {
    return {
      handlers: configs,
      cors
    }
  }

  return {
    ...configs,
    cors
  }
}
