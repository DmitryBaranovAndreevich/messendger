import { BASE_URL, BaseAPI, HTTPTransport } from "../../services";
import { TRegisterRequestParams } from "./register-types";

const registerApiInstance = new HTTPTransport(BASE_URL);

export class RegisterAPI extends BaseAPI {
  create(user: TRegisterRequestParams) {
    return registerApiInstance.post("/auth/signup", { data: user });
  }
}
