import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from "sinon";
import { RegisterAPI } from "./register-api";
import { expect } from "chai";

describe("Проверяем работу сервиса отправки запросов", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let requests: SinonFakeXMLHttpRequest[];

  const requestApi = new RegisterAPI();

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

  it("Проверяем метод 'Create'", () => {
    requestApi.create({
      phone: "test",
      display_name: "test",
      second_name: "test",
      first_name: "test",
      login: "test",
      email: "test",
    });
    expect(requests).to.have.lengthOf(1);
  });
});
