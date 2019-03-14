# Fearless

⚡️microframework focused on productivity and performance so that developers can work less is to produce more without having risks in compromising performance

## Install

#### yarn
```sh
yarn add @fearless/fearless
```

#### npm
```sh
npm install @fearless/fearless
```

## Simple example

```js
const { fearless, get } = require('@fearless/fearless')

const index = get('/', (req, res) => res.send('ping =D!'))
const ping = get('/ping', (req, res) => res.send('ping =D!'))
const helloWorld = get('/hello-world', (req, res) => res.send('Hello, World!'))

fearless([index, ping, helloWorld])
```
