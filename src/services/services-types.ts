export interface IHTTPTransport {
  get: (url: string, options: TTypeTOptions) => Promise<XMLHttpRequest>;
  put: (url: string, options: TTypeTOptions) => Promise<XMLHttpRequest>;
  post: (
    url: string,
    options: TTypeTOptions & { timeout?: number }
  ) => Promise<XMLHttpRequest>;
  delete: (
    url: string,
    options: TTypeTOptions & { timeout?: number }
  ) => Promise<XMLHttpRequest>;
  request: (
    url: string,
    options: TTypeTOptions & { timeout?: number },
    time: number
  ) => Promise<XMLHttpRequest>;
}

export type TTypeTOptions = {
  method: string;
  data?: string;
  headers?: Record<string, string >;
  timeout?: number;
};
