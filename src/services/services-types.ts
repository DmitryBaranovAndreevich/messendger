export interface IHTTPTransport {
  get: (url: string, options: TTypeTOptions) => Promise<XMLHttpRequest>;
  put: (url: string, options: TTypeTOptions) => Promise<XMLHttpRequest>;
  post: (url: string, options: TTypeTOptions) => Promise<XMLHttpRequest>;
  delete: (url: string, options: TTypeTOptions) => Promise<XMLHttpRequest>;
  request: (
    url: string,
    options: TTypeTOptions & { method: string },
  ) => Promise<XMLHttpRequest>;
}

export type TTypeTOptions = {
  data?: Record<string, string | number | (string | number)[]> | FormData;
  headers?: Record<string, string>;
  timeout?: number;
};
