import uWS from "uWebSockets.js";
import { HTTP, setHandler } from "./http";

export * from "./http";

export type Request = {
  params: Record<string, string>;
  query: Record<string, string>;
  body: Record<string, string>;
  headers: Record<string, string>;
  cookies: Record<string, string>;
  ip: string;
  method: string;
};

export type Response = {
  status: (code: number) => Response;
  json: (data: any) => Response;
  send: (data: any) => Response;
  end: (data: any) => void;
  cookie: (name: string, value: string, options: any) => Response;
  clearCookie: (name: string, options: any) => Response;
  redirect: (url: string) => void;
  onAborted: (cb: () => void) => void;
  aborted: boolean;
};

type Handler = {
  pattern: string;
  method: keyof typeof HTTP;
  handler: (req: Request, res: Response) => void;
};

type Options = {
  handlers?: Handler[] | [];
  ssl?: any;
  middlewares?: ((req: Request, res: Response) => void)[];
};

export const fearless = (options: Options): void => {
  const { ssl = null, middlewares = [], handlers } = options;

  const app = uWS.App(ssl ? ssl : {});
  
  // @TODO - FIX THIS
  // @ts-ignore
  handlers?.forEach((handler: Handler) => setHandler(app, handler, middlewares));

  app.listen(3000, () => {
    console.log("Listening to port 3000");
    handlers?.forEach(({ pattern, method }) => {
      console.log(`Listening to ${method.toUpperCase()} ${pattern}`);
    });
  });
};
