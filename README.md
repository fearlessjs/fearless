# Fearless

⚡️microframework focused on productivity and performance so that developers can work less is to produce more without having risks in compromising performance

## 🎩 &nbsp; Features

- 🧘 **Zero config and easy.** Made to start and use.
- ⚡️ **Blazing Fast.** Support uWS(C++) where you have more performance.
- 🎛 **Pluggable.** With middlewares
- 🔐 **Typescript Support.** We have a full support for your type definitions.

## 🗃 &nbsp; Examples

<!--
- **[helloWorld](https://github.com/fearlessjs/examples/tree/master/examples/helloWorld/index.js)** - Some helloWorld example -->

## Install

#### yarn

```sh
yarn add @fearless/fearless
```

#### npm

```sh
npm install @fearless/fearless
```

## GET example

```js
const fearless = require("@fearless/fearless")
const { get, send } = require("@fearless/fearless")

const ping = get("/ping", (req, res) => send(res, 200, "ping =D!"))

fearless([ping])
```

## Async/Await example

```js
const fearless = require("@fearless/fearless")
const { get, send, sendAsync } = require("@fearless/fearless")

const helloWorld = get("/ping", (req, res) =>
  sendAsync(res, 200, async () => "Hello, World")
);

fearless([helloWorld])
```

## Body JSON with POST

```js
const fearless = require("@fearless/fearless")
const { post, sendAsync } = require("@fearless/fearless")
const json = require("@fearless/json")

const postExample = post("/", (req, res) => {
  sendAsync(res, 200, async () => {
    const data = await json(res)
    return data
  })
}

fearless([postExample])
```
