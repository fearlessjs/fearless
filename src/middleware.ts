import { HttpRequest, HttpResponse } from "uWebSockets.js";

export type Middleware = (
  req: HttpRequest,
  res: HttpResponse,
  next: () => void
) => void;

export class MiddlewareManager {
  private middlewares: Middleware[] = [];

  use(middleware: Middleware): void {
    this.middlewares.push(middleware);
  }

  run(req: HttpRequest, res: HttpResponse, finalHandler: () => void): void {
    let index = 0;

    const next = () => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index++];
        middleware(req, res, next);
      } else {
        finalHandler();
      }
    };

    next();
  }
}
