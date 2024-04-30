import { readJson } from "./helper";
import { FRequest, FResponse, Method } from "./types";

export const handler = (
  app: any,
  { pattern, method, handler }: Method,
  middlewares: ((req: FRequest, res: FResponse) => void)[]
): void => {
  app[method](pattern, async (res: FResponse, req: FRequest) => {
    // @ts-ignore
    req.pattern = pattern;
    req.method = method;

    res.status = (code: number) => {
      res.writeStatus(code.toString() || "200");
      return res;
    };

    res.send = (data: any) => {
      if (typeof data === "object") {
        res.writeHeader("Content-Type", "application/json");
        data = JSON.stringify(data);
      }

      res.writeHeader("Content-Type", "text/html");

      res.end(data);
      return res;
    };

    if (method !== "get") {
      req.body = readJson(res);
    }

    try {
      middlewares.forEach((middleware) => {
        middleware(req, res);
      });

      handler.constructor.name === "AsyncFunction"
        ? await handler(req, res)
        : handler(req, res);
    } catch (error) {
      res.status(500).send({
        error: "Internal server error",
        status: 500,
        stack: error.toString(),
      });
    }
  });
};
