import { IHTTPTransport, TTypeTOptions } from "./services-types";

const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
} as const;

function queryStringify(data: Record<string, string | number> = {}) {
  return Object.entries(data)
    .map(([key, value]) => `${key}=${encodeURIComponent(value || "")}`)
    .join("&");
}

export class HTTPTransport implements IHTTPTransport {
  constructor(private baseUrl: string) {}
  get = (url: string, options?: TTypeTOptions) => {
    return this.request(`${this.baseUrl}${url}`, {
      ...(options || {}),
      method: METHODS.GET,
    });
  };

  put = (url: string, options?: TTypeTOptions) => {
    return this.request(`${this.baseUrl}${url}`, {
      ...(options || {}),
      method: METHODS.PUT,
    });
  };
  post = (url: string, options?: TTypeTOptions) => {
    return this.request(`${this.baseUrl}${url}`, {
      ...(options || {}),
      method: METHODS.POST,
    });
  };
  delete = (url: string, options?: TTypeTOptions) => {
    return this.request(`${this.baseUrl}${url}`, {
      ...(options || {}),
      method: METHODS.DELETE,
    });
  };

  request = (url: string, options: TTypeTOptions & { method: string }) => {
    const { method, data, headers = {}, timeout = 15000 } = options;
    const DEFAULT_HEADER = data ? { "Content-Type": `application/json` } : {};

    return new Promise<XMLHttpRequest>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const parmsUrl =
        method === METHODS.GET ? `${url}?${queryStringify(data)}` : url;
      xhr.open(method, parmsUrl);
      Object.entries({ ...headers, ...DEFAULT_HEADER }).forEach(
        ([header, value]) => {
          xhr.setRequestHeader(header, value);
        },
      );
      xhr.timeout = timeout;

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(data ? JSON.stringify(data) : undefined);
      }
    });
  };
}
