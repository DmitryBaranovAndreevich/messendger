import sinon, {
  SinonFakeXMLHttpRequest,
  SinonFakeXMLHttpRequestStatic,
} from "sinon";
import { ProfileAPI } from "./profile-api";
import { expect } from "chai";

describe("Проверяем работу сервиса отправки запросов", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let requests: SinonFakeXMLHttpRequest[];

  const profileApi = new ProfileAPI();

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

  it("Проверяем метод 'Delete'", () => {
    profileApi.delete();
    expect(requests).to.have.lengthOf(1);
  });

  it("Проверяем метод 'Request'", () => {
    profileApi.request();
    expect(requests).to.have.lengthOf(2);
  });

  it("Проверяем метод 'EditProfile'", () => {
    profileApi.editProfile({
      avatarImg: "test",
      first_name: "test",
      second_name: "test",
      display_name: "test",
      login: "test",
      email: "test",
      phone: "test",
    });
    expect(requests).to.have.lengthOf(3);
  });

  it("Проверяем метод 'EditPass'", () => {
    profileApi.editPass({ oldPassword: "test", newPassword: "test" });
    expect(requests).to.have.lengthOf(4);
  });

  it("Проверяем метод 'EditAvatar'", () => {
    profileApi.editAvatar(new FormData());
    expect(requests).to.have.lengthOf(5);
  });
});
