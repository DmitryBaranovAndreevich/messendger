import { BaseAPI, HTTPTransport } from "../../services";
import { TLoginUserRequest } from "./login-types";

const registerApiInstance = new HTTPTransport(
  "https://ya-praktikum.tech/api/v2",
);

export class LoginAPI extends BaseAPI {
  request(user: TLoginUserRequest) {
    return registerApiInstance.post("/auth/signin", { data: user });
  }
}
