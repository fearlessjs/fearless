import { readJson } from "./helper";
import { FRequest, FResponse } from "./types";

export const handler = (
  app: any,
  // @ts-ignore
  { pattern, method, handler, options, handlers }: Method,
  middlewares: ((req: any, res: any) => void)[]
): void => {
  app[method](pattern, async (res: FResponse, req: FRequest) => {
    middlewares.forEach((middleware) => {
      middleware(req, res);
    });

    res.status = (code: number) => {
      res.writeStatus(code.toString());
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
