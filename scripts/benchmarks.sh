# lsof -ti:3000 | xargs kill

./node_modules/.bin/concurrently --kill-others "node ./benchmarks/express.js" "wrk -t12 -c400 -d2s http://0.0.0.0:3000 > ./benchmarks/results/express.md"