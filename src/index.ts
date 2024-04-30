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
    const { ssl, middlewares } = options || {
      ssl: {},
      middlewares: [],
    };

    this.app = uWS.App(ssl ? ssl : {});
    this.middlewares = middlewares;
  }

  public use(middleware: (req: FRequest, res: FResponse) => void): void {
    this.middlewares.push(middleware);
  }

  public listen(port: number, cb?: () => void): void {
    try {
      this.handlers.forEach((h: Handler) => {
        handler(this.app, h, this.middlewares);
        console.log("Route:", h.method, h.pattern, "is ready!");
      });

      this.app.listen(port, () => {
        if (cb) return cb();

        console.log(`Server is running on http://localhost:${port}`);
      });
    } catch (error) {
      console.log(error);
    }
  }

  public get<T>(
    pattern: string,
    handler: (req: FRequest & T, res: FResponse) => void
  ) {
    this.handlers.push({ pattern, method: "get", handler } as any);
  }

  public post<T>(
    pattern: string,
    handler: (req: FRequest & T, res: FResponse) => void
  ) {
    this.handlers.push({ pattern, method: "post", handler } as any);
  }

  public put<T>(
    pattern: string,
    handler: (req: FRequest & T, res: FResponse) => void
  ) {
    this.handlers.push({ pattern, method: "put", handler } as any);
  }

  public delete<T>(
    pattern: string,
    handler: (req: FRequest & T, res: FResponse) => void
  ) {
    this.handlers.push({ pattern, method: "del", handler } as any);
  }

  public options<T>(
    pattern: string,
    handler: (req: FRequest & T, res: FResponse) => void
  ) {
    this.handlers.push({ pattern, method: "options", handler } as any);
  }

  public head<T>(
    pattern: string,
    handler: (req: FRequest & T, res: FResponse) => void
  ) {
    this.handlers.push({ pattern, method: "head", handler } as any);
  }

  public patch<T>(
    pattern: string,
    handler: (req: FRequest & T, res: FResponse) => void
  ) {
    this.handlers.push({ pattern, method: "patch", handler } as any);
  }

  public connect<T>(
    pattern: string,
    handler: (req: FRequest & T, res: FResponse) => void
  ) {
    this.handlers.push({ pattern, method: "connect", handler } as any);
  }

  public trace<T>(
    pattern: string,
    handler: (req: FRequest & T, res: FResponse) => void
  ) {
    this.handlers.push({ pattern, method: "trace", handler } as any);
  }

  public any<T>(
    pattern: string,
    handler: (req: FRequest & T, res: FResponse) => void
  ) {
    this.handlers.push({ pattern, method: "any", handler } as any);
  }
}
