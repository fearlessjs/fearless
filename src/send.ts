import { HttpResponse } from "./interfaces";

const isObjectOrArray = (body: Object): boolean => typeof body === 'object' || Array.isArray(body)

const send = (res: HttpResponse, statusCode: number, data: Object): void => {
  res.writeStatus(statusCode.toString())
  // res.end(isObjectOrArray(data) ? JSON.stringify(data) : data)
}

const sendError = (res: HttpResponse, statusCode: number, message: string | null = null, stack: string | null = null): void => {
  res.writeStatus(statusCode.toString())
  res.end(JSON.stringify({ message, stack }))
}

const sendAsync = async (res: HttpResponse, statusCode: number, handler: Function) => {
  res.onAborted(() => {
    res.aborted = true
  })

  let data = await handler()

  if (!res.aborted) {
    if (data.error) {
      res.writeStatus(data.statusCode.toString() || 500)
      res.end({ message: data.message, stack: data.stack })
      return
    }

    res.writeStatus(statusCode.toString() || 200)
    res.end(isObjectOrArray(data) ? JSON.stringify(data) : data)
  }
}

export default {
  send,
  sendAsync,
  sendError
}