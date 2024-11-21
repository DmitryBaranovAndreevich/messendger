import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from "sinon";
import { LoginAPI } from "./login-api";
import { expect } from "chai";

describe("Проверяем работу сервиса отправки запросов", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let requests: SinonFakeXMLHttpRequest[];

  const loginApi = new LoginAPI();

  before(function () {
    xhr = sinon.useFakeXMLHttpRequest();
    global.XMLHttpRequest = xhr as unknown as typeof XMLHttpRequest;
    requests = [];
    xhr.onCreate = function (req) {
      requests.push(req);
    };
  });

  after(function () {
    xhr.restore();
  });

  it("Проверяем метод 'Request'", () => {
    loginApi.request({ login: "test", password: "test" });
    expect(requests).to.have.lengthOf(1);
  });
});
