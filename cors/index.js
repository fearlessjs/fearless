module.exports = (configs = {}) => handlers => ({
  configs: {
    origin: ['*']
  },
  handlers
})
