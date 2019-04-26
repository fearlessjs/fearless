import { HttpRequest, HttpResponse } from 'uWebSockets.js'

interface ISSL {
  keyFileName?: string
  certFileName?: string
  passphrase?: string
  dhParamsFileName?: string
}

interface IListen {
  port: number
  handler: Function
}

interface IFearlessConfig {
  handlers?: Function[]
  listen: IListen
  ssl?: ISSL
  middlewares?: Function[]
}

export { IFearlessConfig, HttpRequest, HttpResponse }
