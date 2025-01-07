import { HttpRequest, HttpResponse } from "uWebSockets.js";
import { Middleware } from "../middleware";

type CorsOptions = {
  origin?: string | string[] | ((origin: string) => string | null);
  methods?: string | string[];
  allowedHeaders?: string | string[];
  credentials?: boolean;
  maxAge?: number;
};

export function cors(options: CorsOptions = {}): Middleware {
  const {
    origin = "*",
    methods = "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders = "Content-Type,Authorization",
    credentials = false,
    maxAge = 86400,
  } = options;

  return (req: HttpRequest, res: HttpResponse, next: () => void) => {
    const requestOrigin = req.getHeader("origin");

    if (origin === "*") {
      res.writeHeader("Access-Control-Allow-Origin", "*");
    } else if (typeof origin === "function") {
      const allowedOrigin = origin(requestOrigin);
      if (allowedOrigin) {
        res.writeHeader("Access-Control-Allow-Origin", allowedOrigin);
      }
    } else if (Array.isArray(origin)) {
      if (origin.includes(requestOrigin)) {
        res.writeHeader("Access-Control-Allow-Origin", requestOrigin);
      }
    } else {
      res.writeHeader("Access-Control-Allow-Origin", origin);
    }

    res.writeHeader(
      "Access-Control-Allow-Methods",
      Array.isArray(methods) ? methods.join(",") : methods
    );

    res.writeHeader(
      "Access-Control-Allow-Headers",
      Array.isArray(allowedHeaders) ? allowedHeaders.join(",") : allowedHeaders
    );

    if (credentials) {
      res.writeHeader("Access-Control-Allow-Credentials", "true");
    }

    res.writeHeader("Access-Control-Max-Age", maxAge.toString());

    if (req.getMethod().toUpperCase() === "OPTIONS") {
      // @ts-ignore
      res.end();
    } else {
      next();
    }
  };
}
