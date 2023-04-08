# Fearless

💻 Developers, get ready to work less and produce more with our amazing microframework! It's designed with a focus on productivity and performance, allowing you to create applications quickly and efficiently, without sacrificing speed. We know your time is valuable, so we've created this tool to help you focus on what really matters - creating the next big idea in technology. With our microframework, you'll never have to choose between speed and quality again. Come try it out now and see how your developer life can become easier and more exciting! ⚡️

## 🎩 &nbsp; Features

- 📦 **Fast install.** We have a fast install with a small size.
- 🧘 **Zero config and easy.** Made to start and use.
- ⚡️ **Blazing Fast.** Support uWS(C++) where you have more performance.
- 🎛 **Pluggable.** With middlewares
- 🔐 **Typescript Support.** We have a full support for your type definitions.

# 🚀 &nbsp; Getting Started

## Installation

```bash
npm install @fearlessjs/fearless
```

## Usage

```ts
import { fearless } from '@fearlessjs/fearless'
import type { Request, Response } from '@fearlessjs/fearless'

const app = fearless()

app.get('/', (req: Request, res: Response): void => {
  res.end('Hello World from Fearless')
})

app.listen(3000)
```


## 📖 &nbsp; Documentation

## 📝 &nbsp; License

Fearless is [MIT licensed](./LICENSE).

## 🤝 &nbsp; Contributing

Contributions, issues and feature requests are welcome!