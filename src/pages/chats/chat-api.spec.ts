import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from "sinon";
import { ChatsAPI } from "./chats-api";
import { expect } from "chai";

describe("Проверяем работу сервиса отправки запросов", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let requests: SinonFakeXMLHttpRequest[];

  const chatApi = new ChatsAPI();

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
    chatApi.create("test");
    expect(requests).to.have.lengthOf(1);
  });

  it("Проверяем метод 'Delete'", () => {
    chatApi.delete("test");
    expect(requests).to.have.lengthOf(2);
  });

  it("Проверяем метод 'Delete'", () => {
    chatApi.delete("test");
    expect(requests).to.have.lengthOf(3);
  });

  it("Проверяем метод 'Request'", () => {
    chatApi.request();
    expect(requests).to.have.lengthOf(4);
  });

  it("Проверяем метод 'GetUser'", () => {
    chatApi.getUser();
    expect(requests).to.have.lengthOf(5);
  });

  it("Проверяем метод 'GetChat'", () => {
    chatApi.getChat("test");
    expect(requests).to.have.lengthOf(6);
  });

  it("Проверяем метод 'RemoveUserFromChat'", () => {
    chatApi.removeUserFromChat("test", "test");
    expect(requests).to.have.lengthOf(7);
  });

  it("Проверяем метод 'GetChatUser'", () => {
    chatApi.getChatUser("test");
    expect(requests).to.have.lengthOf(8);
  });

  it("Проверяем метод 'AddUserToChat'", () => {
    chatApi.addUserToChat("test", "test");
    expect(requests).to.have.lengthOf(9);
  });

  it("Проверяем метод 'UserSearch'", () => {
    chatApi.userSearch("test");
    expect(requests).to.have.lengthOf(10);
  });

  it("Проверяем метод 'GetChatToken'", () => {
    chatApi.getChatToken("test");
    expect(requests).to.have.lengthOf(11);
  });
});
