const { forEach } = require('ramda')
const { exec } = require('child_process')

const frameworks = ['EXPRESS', 'HAPI', 'MICRO', 'FASTIFY', 'RAMDALESS', 'KOA2']

const closePort = () => exec('lsof -ti:3000 | xargs kill')

const runBenchmark = framework => {
  const name = framework.toLowerCase()

  closePort()
  exec(`node ../benchmarks/${name}`)
  exec(
    `wrk -t12 -c400 -d60s http://0.0.0.0:3000 > ./benchmarks/results/${name}.md`
  )
}

const main = () => {
  forEach(runBenchmark, frameworks)
}

main()
