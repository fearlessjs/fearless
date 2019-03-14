const { fearless, get } = require('./src')

fearless([
  get('/1', (req, res) => {
    res.send(300, 'DHUASDUHASHDUASUHDHU RODRIGO')
  }),
  get('/2', (req, res) => {
    res.send(['DUHASHUDASHUD', 'HUDASHUDASHUD'])
  }),
  get('/3', (req, res) => {
    res.send(500, { rodrigo: 'RODRIGO', marcio: 'MARCIO' })
  }),
  get('/4', (req, res) => {
    res.send('asdhuasudhashuduhas marcio!')
  })
])
