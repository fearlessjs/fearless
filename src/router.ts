import { HttpRequest, HttpResponse } from "uWebSockets.js";

type Handler = (req: HttpRequest, res: HttpResponse) => void;

export class Router {
  private routes: Record<string, Record<string, Handler>> = {};

  get(path: string, handler: Handler): void {
    this.registerRoute("GET", path, handler);
  }

  post(path: string, handler: Handler): void {
    this.registerRoute("POST", path, handler);
  }

  put(path: string, handler: Handler): void {
    this.registerRoute("PUT", path, handler);
  }

  delete(path: string, handler: Handler): void {
    this.registerRoute("DELETE", path, handler);
  }

  patch(path: string, handler: Handler): void {
    this.registerRoute("PATCH", path, handler);
  }

  head(path: string, handler: Handler): void {
    this.registerRoute("HEAD", path, handler);
  }

  options(path: string, handler: Handler): void {
    this.registerRoute("OPTIONS", path, handler);
  }

  private registerRoute(method: string, path: string, handler: Handler): void {
    this.routes[path] = this.routes[path] || {};
    this.routes[path][method] = handler;
  }

  resolve(method: string, path: string): Handler | undefined {
    return this.routes[path]?.[method];
  }
}
