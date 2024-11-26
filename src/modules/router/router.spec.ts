import sinon from "sinon";
import { expect } from "chai";
import { Router } from "./router";
import { LoginRoute } from "./loginRoute";
import { ProtectedRoute } from "./protectedRoute";
import { eraseCookie, eventBusRouter, setCookie } from "../../utils";
import { isEqual } from "./router-utils";

describe("Проверяем работу роутера", () => {
  const thisWindow = global.window;
  const thisDocument = global.document;
  before(function () {
    global.document = { ...global.document, cookie: "" };
    global.window = {
      history: {
        ...global.history,
        pushState: sinon.fake(),
      } as typeof window.history,
    } as typeof window;
  });

  after(function () {
    global.window = thisWindow;
    global.document = thisDocument;
  });

  beforeEach(function () {
    sinon.spy(eventBusRouter);
  });

  afterEach(function () {
    sinon.restore();
  });

  it("Проверяем работу роутера с LoginRoute", () => {
    const fakeReplace = sinon.fake() as ReturnType<typeof sinon.spy>;
    global.window.history.replaceState = fakeReplace;
    const getFakeComponent = sinon.fake();
    const router = new Router("root");
    router.use("/", getFakeComponent, LoginRoute);
    router.go("/", false);
    expect(fakeReplace.callCount).to.be.equal(1);
    expect(fakeReplace.lastArg).to.be.equal("/");
  });

  it("Проверяем работу роутера с ProtectedRoute", () => {
    const fakeReplace = sinon.fake() as ReturnType<typeof sinon.spy>;
    global.window.history.replaceState = fakeReplace;
    const getFakeComponent = sinon.fake();
    const router = new Router("root");
    router.use("/messenger", getFakeComponent, ProtectedRoute);
    router.go("/messenger", false);
    expect(fakeReplace.callCount).to.be.equal(1);
    expect(fakeReplace.lastArg).to.be.equal("/messenger");
  });

  it("Проверяем ProtectedRoute для не залогиненого пользователя", () => {
    const getFakeComponent = sinon.fake();
    const router = new Router("root");
    router.use("/messenger", getFakeComponent, ProtectedRoute);
    router.go("/messenger", false);
    expect(
      (eventBusRouter.emit as ReturnType<typeof sinon.spy>).callCount,
    ).to.be.equal(1);
    expect(
      (eventBusRouter.emit as ReturnType<typeof sinon.spy>).getCall(0).args[1],
    ).to.be.equal("/");
  });

  it("Проверяем ProtectedRoute для залогиненого пользователя", () => {
    setCookie("login", "true", { expires: 1200 });
    const getFakeComponent = sinon.fake();
    const router = new Router("root");
    router.use("/messenger", getFakeComponent, ProtectedRoute);
    router.go("/messenger", false);
    expect(
      (eventBusRouter.emit as ReturnType<typeof sinon.spy>).callCount,
    ).to.be.equal(0);
    eraseCookie("login");
  });

  it("Проверяем LoginRoute для залогиненого пользователя", () => {
    setCookie("login", "true", { expires: 1200 });
    const getFakeComponent = sinon.fake();
    const router = new Router("root");
    router.use("/", getFakeComponent, ProtectedRoute);
    router.go("/", false);
    expect(
      (eventBusRouter.emit as ReturnType<typeof sinon.spy>).callCount,
    ).to.be.equal(1);
    expect(
      (eventBusRouter.emit as ReturnType<typeof sinon.spy>).getCall(0).args[1],
    ).to.be.equal("/messenger");
    eraseCookie("login");
  });

  it("Проверяем LoginRoute для не залогиненого пользователя", () => {
    const getFakeComponent = sinon.fake();
    const router = new Router("root");
    router.use("/", getFakeComponent, ProtectedRoute);
    router.go("/", false);
    expect(
      (eventBusRouter.emit as ReturnType<typeof sinon.spy>).callCount,
    ).to.be.equal(0);
  });

  it("Проверяем метод back", () => {
    const getFakeComponent = sinon.fake();
    const fakeBack = sinon.fake() as ReturnType<typeof sinon.spy>;
    global.window.history.back = fakeBack;
    const router = new Router("root");
    router.use("/", getFakeComponent, ProtectedRoute);
    router.back();
    expect(fakeBack.callCount).to.be.equal(1);
  });

  it("Проверяем метод forward", () => {
    const getFakeComponent = sinon.fake();
    const fakeForward = sinon.fake() as ReturnType<typeof sinon.spy>;
    global.window.history.forward = fakeForward;
    const router = new Router("root");
    router.use("/", getFakeComponent, ProtectedRoute);
    router.forward();
    expect(fakeForward.callCount).to.be.equal(1);
  });

  it("проверяем isEqual", () => {
    expect(isEqual("/", "/")).to.be.equal(true);
    expect(isEqual("/", "/messenger")).to.be.equal(false);
  });
});
