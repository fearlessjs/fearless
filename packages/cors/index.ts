const DEFAULT_MAX_AGE_SECONDS = 60 * 60 * 24;

const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

const DEFAULT_ALLOWED_HEADERS =
  "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept";

export type CorsOptions = {
  origin?: string;
  methods?: string;
  allowedHeaders?: string;
  exposedHeaders?: string;
  credentials?: string;
  maxAge?: string;
};

export const cors = (options?: CorsOptions) => {
  return (req: any, res: any) => {
    const origin = options?.origin || "*";
    const methods = options?.methods || DEFAULT_ALLOWED_METHODS;
    const allowedHeaders = options?.allowedHeaders || DEFAULT_ALLOWED_HEADERS;
    const exposedHeaders = options?.exposedHeaders || "";
    const credentials = options?.credentials || "true";
    const maxAge = options?.maxAge || DEFAULT_MAX_AGE_SECONDS.toString();

    res.writeHeader("Access-Control-Allow-Origin", origin);
    res.writeHeader("Access-Control-Allow-Methods", methods);
    res.writeHeader("Access-Control-Allow-Headers", allowedHeaders);
    res.writeHeader("Access-Control-Expose-Headers", exposedHeaders);
    res.writeHeader("Access-Control-Allow-Credentials", credentials);
    res.writeHeader("Access-Control-Max-Age", maxAge);

    if (req.method === "OPTIONS") {
      res.status(200).send();
      return;
    }
  };
};
