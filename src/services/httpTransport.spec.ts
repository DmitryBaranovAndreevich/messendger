import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from "sinon";
import { HTTPTransport } from "./httpTransport";
import { expect } from "chai";

describe("Проверяем работу сервиса отправки запросов", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let requests: SinonFakeXMLHttpRequest[];

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

  const transport = new HTTPTransport("https://test.ru");

  it("Проверяем Get запрос", () => {
    transport.get("get");
    expect(requests).to.have.lengthOf(1);
  });

  it("Проверяем Post запрос", () => {
    transport.post("post");
    expect(requests).to.have.lengthOf(2);
  });

  it("Проверяем Put запрос", () => {
    transport.put("put");
    expect(requests).to.have.lengthOf(3);
  });

  it("Проверяем Delete запрос", () => {
    transport.delete("delete");
    expect(requests).to.have.lengthOf(4);
  });
});
