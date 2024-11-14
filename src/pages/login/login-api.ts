import { BASE_URL, BaseAPI, HTTPTransport } from "../../services";
import { TLoginUserRequest } from "./login-types";

const registerApiInstance = new HTTPTransport(BASE_URL);

export class LoginAPI extends BaseAPI {
  request(user: TLoginUserRequest) {
    return registerApiInstance.post("/auth/signin", { data: user });
  }
}
