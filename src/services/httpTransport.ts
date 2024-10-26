import { IHTTPTransport, TTypeTOptions } from "./services-types";

const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};

function queryStringify(data = {}) {
  return Object.entries(data)
    .map(([key, value]) => `${key}=${value?.toString()}`)
    .join("&");
}

export class HTTPTransport implements IHTTPTransport {
  get = (url: string, options?: TTypeTOptions) => {
    return this.request(
      url,
      { ...(options || {}), method: METHODS.GET },
      options?.timeout
    );
  };

  put = (url: string, options?: TTypeTOptions) => {
    return this.request(
      url,
      { ...(options || {}), method: METHODS.PUT },
      options?.timeout
    );
  };
  post = (url: string, options?: TTypeTOptions) => {
    return this.request(
      url,
      { ...(options || {}), method: METHODS.POST },
      options?.timeout
    );
  };
  delete = (url: string, options?: TTypeTOptions) => {
    return this.request(
      url,
      { ...(options || {}), method: METHODS.DELETE },
      options?.timeout
    );
  };

  request = (url: string, options: TTypeTOptions, timeout = 5000) => {
    const { method, data, headers = {} } = options;

    return new Promise<XMLHttpRequest>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const parmsUrl =
        method === METHODS.GET ? `${url}?${queryStringify(data)}` : url;
      xhr.open(method, parmsUrl);
      Object.entries(headers).forEach(([header, value]) => {
        xhr.setRequestHeader(header, value);
      });
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
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
