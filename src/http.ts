import { Request, Response } from ".";

export enum HTTP {
  GET = "get",
  POST = "post",
  PUT = "put",
  DEL = "del",
  OPTIONS = "options",
  PATCH = "patch",
  HEAD = "head",
  CONNECT = "connect",
  TRACE = "trace",
  ANY = "any",
  WEB_SOCKET = "web_socket",
}

type Method =
  | {
      method: HTTP;
      pattern: string;
      handler: (req: any, res: any) => void;
    }
  | {
      method: HTTP.WEB_SOCKET;
      pattern: string;
      options: any;
      handlers: any;
    };

const getMethods = (
  method: HTTP
):
  | ((
      pattern: string,
      handler: (req: Request, res: Response) => void
    ) => Method)
  | ((pattern: string, options: any, handlers: any) => Method) => {
  return method === HTTP.WEB_SOCKET
    ? (pattern: string, options: any, handlers: any): Method => ({
        method,
        pattern,
        options,
        handlers,
      })
    : (pattern: string, handler: (req: any, res: any) => void): Method => ({
        method,
        pattern,
        handler,
      });
};

export const setHandler = (
  app: any,
  // @ts-ignore
  { pattern, method, handler, options, handlers }: Method,
  middlewares: ((req: any, res: any) => void)[]
): void => {
  if (method === HTTP.WEB_SOCKET) {
    app[method](pattern, {
      ...options,
      ...handlers,
    });
  }

  if (handler.constructor.name === "AsyncFunction") {
    app[method](pattern, async (res: Response, req: Request) => {
      res.onAborted(() => {
        res.aborted = true;
      });

      await handler(req, res);
    });

    return;
  }

  app[method](pattern, (res: Response, req: Request) => {
    middlewares.forEach((m) => m(req, res));
    handler(req, res);
  });
};

export const [
  get,
  post,
  put,
  del,
  options,
  patch,
  head,
  connect,
  trace,
  any,
  webSocket,
] = Object.values(HTTP).map(getMethods);
