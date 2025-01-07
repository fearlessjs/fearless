declare module "uWebSockets.js" {
  export interface HttpResponse {
    end(body: string): void;
    writeStatus(status: string): HttpResponse;
    writeHeader(key: string, value: string): HttpResponse;
  }

  export interface HttpRequest {
    getUrl(): string;
    getMethod(): string;
    getHeader(key: string): string;
  }

  export interface AppOptions {
    key_file_name?: string;
    cert_file_name?: string;
    passphrase?: string;
  }

  export interface App {
    get(
      pattern: string,
      handler: (res: HttpResponse, req: HttpRequest) => void
    ): App;
    post(
      pattern: string,
      handler: (res: HttpResponse, req: HttpRequest) => void
    ): App;
    listen(port: number, callback: (token: unknown) => void): App;
  }

  export function App(options?: AppOptions): App;
}
