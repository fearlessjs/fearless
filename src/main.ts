import uWS, { HttpResponse, HttpRequest } from "uWebSockets.js";
import { MiddlewareManager } from "./middleware";
import { Router } from "./router";
import { cors } from "./dependencies/cors";

export type Handler = (req: HttpRequest, res: HttpResponse) => void;

class Fearless {
  private app: uWS.App;
  private router: Router;
  private middlewareManager: MiddlewareManager;

  constructor() {
    this.app = uWS.App();
    this.router = new Router();
    this.middlewareManager = new MiddlewareManager();
  }

  use(middleware: MiddlewareManager): void {
    this.middlewareManager.use(middleware as any);
  }

  get(path: string, handler: Handler): void {
    this.router.get(path, handler);
  }

  post(path: string, handler: Handler): void {
    this.router.post(path, handler);
  }

  put(path: string, handler: Handler): void {
    this.router.put(path, handler);
  }

  delete(path: string, handler: Handler): void {
    this.router.delete(path, handler);
  }

  patch(path: string, handler: Handler): void {
    this.router.patch(path, handler);
  }

  head(path: string, handler: Handler): void {
    this.router.head(path, handler);
  }

  options(path: string, handler: Handler): void {
    this.router.options(path, handler);
  }

  private handleRequest(res: HttpResponse, req: HttpRequest): void {
    const method = req.getMethod().toUpperCase();
    const path = req.getUrl();

    const handler = this.router.resolve(method, path);

    if (handler) {
      this.middlewareManager.run(req, res, () => handler(req, res));
    } else {
      res.writeStatus("404 Not Found").end("Not Found");
    }
  }

  listen(
    port: number,
    callback: (err: Error | null, token?: unknown) => void
  ): void {
    this.app.get("/*", (res, req) => this.handleRequest(res, req));
    this.app.post("/*", (res, req) => this.handleRequest(res, req));

    this.app.listen(port, (token: unknown) => {
      if (token) {
        callback(null, token);
      } else {
        callback(new Error(`Failed to listen to port ${port}`));
      }
    });
  }
}

export { Fearless, cors };
