import { BaseAPI, HTTPTransport } from "../../services";
import { TRegisterRequestParams } from "./register-types";

const registerApiInstance = new HTTPTransport(
  "https://ya-praktikum.tech/api/v2",
);

export class RegisterAPI extends BaseAPI {
  create(user: TRegisterRequestParams) {
    return registerApiInstance.post("/auth/signup", { data: user });
  }
}
