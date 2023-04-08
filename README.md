# Fearless

⚡️microframework focused on productivity and performance so that developers can work less is to produce more without having risks in compromising performance

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