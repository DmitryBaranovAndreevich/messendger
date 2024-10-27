export interface IHTTPTransport {
  get: (url: string, options: TTypeTOptions) => Promise<XMLHttpRequest>;
  put: (url: string, options: TTypeTOptions) => Promise<XMLHttpRequest>;
  post: (url: string, options: TTypeTOptions) => Promise<XMLHttpRequest>;
  delete: (url: string, options: TTypeTOptions) => Promise<XMLHttpRequest>;
  request: (url: string, options: TTypeTOptions) => Promise<XMLHttpRequest>;
}

export type TTypeTOptions = {
  method: string;
  data?: Record<string, string | number>;
  headers?: Record<string, string>;
  timeout?: number;
};
