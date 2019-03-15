# Fearless (BETA) - Not yet recommended for production

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

## Simple example

```js
const { fearless, get, send } = require("@fearless/fearless");

const index = get("/", (req, res) => send(res, 200, "index =D!"));
const ping = get("/ping", (req, res) => send(res, 200, "ping =D!"));
const helloWorld = get("/hello-world", (req, res) =>
  send(res, 200, "Hello, World!")
);

fearless([index, ping, helloWorld]);
```

## Async/Await example

```js
const { fearless, get, send, sendAsync } = require("@fearless/fearless");

const helloWorld = get("/ping", (req, res) =>
  sendAsync(res, 200, async () => "Hello, World")
);

fearless([helloWorld]);
```

## Body JSON with POST

```js
const { fearless, post, send } = require("@fearless/fearless");

const createUser = post("/", (req, res) => {
  send(res, 200, req.body)
}

fearless([createUser]);
```
