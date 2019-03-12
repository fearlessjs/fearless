module.exports = configs => {
  const cors = {
    origin: ['*']
  }

  if (Array.isArray(configs)) {
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
