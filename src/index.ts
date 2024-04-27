import uWS from "uWebSockets.js";
import { handler } from "./http";
import { Handler, Options, FRequest, FResponse } from "./types";

export * from "./http";
export * from "./types";

export class Fearless {
  private app: any;
  private handlers: Handler[] = [];
  private middlewares: ((req: FRequest, res: FResponse) => void)[] = [];

  constructor(options?: Options) {
    const { ssl, middlewares, handlers } = options || {
      ssl: {},
      middlewares: [],
      handlers: [],
    };

    this.app = uWS.App(ssl ? ssl : {});
    this.handlers = handlers;
    this.middlewares = middlewares;
  }

  public use(middleware: (req: FRequest, res: FResponse) => void): void {
    this.middlewares.push(middleware);
  }

  public listen(port: number, cb?: () => void): void {
    try {
      this.handlers.forEach((h: Handler) =>
        handler(this.app, h, this.middlewares)
      );

      this.app.listen(port, () => {
        console.log("Listening to port 3000");
        this.handlers.forEach(({ pattern, method }) => {
          console.log(`Listening to ${method.toUpperCase()} ${pattern}`);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  public get(pattern: string, handler: (req: FRequest, res: FResponse) => void) {
    this.handlers.push({ pattern, method: "get", handler });
  }

  public post(pattern: string, handler: (req: FRequest, res: FResponse) => void) {
    this.handlers.push({ pattern, method: "post", handler });
  }

  public put(pattern: string, handler: (req: FRequest, res: FResponse) => void) {
    this.handlers.push({ pattern, method: "put", handler });
  }

  public delete(
    pattern: string,
    handler: (req: FRequest, res: FResponse) => void
  ) {
    this.handlers.push({ pattern, method: "del", handler });
  }

  public options(
    pattern: string,
    handler: (req: FRequest, res: FResponse) => void
  ) {
    this.handlers.push({ pattern, method: "options", handler });
  }

  public head(pattern: string, handler: (req: FRequest, res: FResponse) => void) {
    this.handlers.push({ pattern, method: "head", handler });
  }

  public patch(
    pattern: string,
    handler: (req: FRequest, res: FResponse) => void
  ) {
    this.handlers.push({ pattern, method: "patch", handler });
  }

  public connect(
    pattern: string,
    handler: (req: FRequest, res: FResponse) => void
  ) {
    this.handlers.push({ pattern, method: "connect", handler });
  }

  public trace(
    pattern: string,
    handler: (req: FRequest, res: FResponse) => void
  ) {
    this.handlers.push({ pattern, method: "trace", handler });
  }

  public any(pattern: string, handler: (req: FRequest, res: FResponse) => void) {
    this.handlers.push({ pattern, method: "any", handler });
  }
}
