import sinon from "sinon";
import { expect } from "chai";
import { Block } from "./block";
import { TPropsObj } from "./block-types";

const template = `<div>test</test>`;

export class Test extends Block<{}> {
  constructor(props: TPropsObj<{}>) {
    super(props);
  }
  render() {
    return template;
  }
}

describe("Проверяем работу компонента", () => {
  const thisWindow = global.window;
  const thisDocument = global.document;
  before(function () {
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

  it("Проверяем вызов метода init при создании компонента", () => {
    const fakeCreateElement = sinon.fake.returns({}) as ReturnType<
      typeof sinon.spy
    >;
    global.document = { ...global.document, createElement: fakeCreateElement };
    new Test({});
    expect(
      (fakeCreateElement as ReturnType<typeof sinon.spy>).callCount,
    ).to.be.equal(2);
    expect(
      (fakeCreateElement as ReturnType<typeof sinon.spy>).getCall(0).args[0],
    ).to.be.equal("div");
    expect(
      (fakeCreateElement as ReturnType<typeof sinon.spy>).getCall(1).args[0],
    ).to.be.equal("template");
  });

  it("Проверяем работу метода setProps", () => {
    global.document = {
      ...global.document,
      createElement: sinon.fake.returns({}) as ReturnType<typeof sinon.spy>,
    };
    const block = new Test({});
    sinon.spy(block);
    block.setProps({});
    expect(
      (block.setProps as ReturnType<typeof sinon.spy>).callCount,
    ).to.be.equal(1);
    sinon.restore();
  });

  it("Проверяем работу метода getContent", () => {
    const testObj = {};
    global.document = {
      ...global.document,
      createElement: sinon.fake.returns(testObj) as ReturnType<
        typeof sinon.spy
      >,
    };
    const block = new Test({});
    const content = block.getContent();
    expect(content).to.be.equal(testObj);
  });

  it("Проверяем работу метода render", () => {
    const testObj = {};
    global.document = {
      ...global.document,
      createElement: sinon.fake.returns(testObj) as ReturnType<
        typeof sinon.spy
      >,
    };
    const block = new Test({});
    const content = block.render();
    expect(content).to.be.equal(template);
  });

  it("Проверяем работу метода hide", () => {
    const testObj = { style: { display: "block" } };
    global.document = {
      ...global.document,
      createElement: sinon.fake.returns(testObj) as ReturnType<
        typeof sinon.spy
      >,
    };
    const block = new Test({});
    block.hide();
    expect(testObj.style.display).to.be.equal("none");
  });

  it("Проверяем работу метода show", () => {
    const testObj = { style: { display: "none" } };
    global.document = {
      ...global.document,
      createElement: sinon.fake.returns(testObj) as ReturnType<
        typeof sinon.spy
      >,
    };
    const block = new Test({});
    block.show();
    expect(testObj.style.display).to.be.equal("block");
    block.show("flex");
    expect(testObj.style.display).to.be.equal("flex");
  });
});
