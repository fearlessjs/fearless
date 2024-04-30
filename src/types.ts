export type HTTP =
  | "get"
  | "post"
  | "put"
  | "del"
  | "options"
  | "patch"
  | "head"
  | "connect"
  | "trace"
  | "any"
  | "webSocket";

export type Method = {
  method: HTTP;
  pattern: string;
  handler: (req: FRequest, res: FResponse) => void;
};

export type FRequest = {
  params: Record<string, string>;
  query: Record<string, string>;
  body: Promise<any>;
  headers: Record<string, string>;
  cookies: Record<string, string>;
  ip: string;
  method: string;
};

export type FResponse = {
  status: (code: number) => FResponse;
  json: (data: any) => FResponse;
  send: (data: any) => FResponse;
  end: (data: any) => void;
  cookie: (name: string, value: string, options: any) => FResponse;
  clearCookie: (name: string, options: any) => FResponse;
  redirect: (url: string) => void;
  onAborted: (cb: () => void) => void;
  aborted: boolean;
  writeStatus: (status: string) => void;
  writeHeader: (key: string, value: string) => void;
};

export type Handler = {
  pattern: string;
  method: HTTP;
  handler: (req: FRequest, res: FResponse) => void;
};

export type Options = {
  ssl?: any;
  middlewares?: ((req: FRequest, res: FResponse) => void)[];
};
