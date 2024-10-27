import { v4 } from "uuid";
import { EEvents } from "../../types";
import { EventBus, IEventBus } from "../event-bus";
import { IBlock, TProps, TPropsObj } from "./block-types";
import Handlebars from "handlebars";

export class Block<T extends Record<string, TProps>> implements IBlock<T> {
  _element: HTMLElement | null = null;
  _meta: { tagName: string; props: T };
  _id: string;
  props: TPropsObj<T> & { _id: string };
  children: Record<string, Block<Record<string, TProps>>>;
  eventBus: () => IEventBus<EEvents>;
  _state: { value: TProps } = { value: null };

  constructor(propsAndChildren: TPropsObj<T>) {
    const eventBus = new EventBus();
    this._meta = {
      tagName: "div",
      props: propsAndChildren,
    };
    this._id = v4();
    const { children, props } = this._getChildren(propsAndChildren);
    this.props = this._makePropsProxy({
      ...props,
      _id: this._id,
    } as TPropsObj<T> & { _id: string });
    this.children = children;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(EEvents.INIT);
  }

  get state() {
    return this._state.value;
  }

  set state(value) {
    this._state.value = value;
    this.eventBus().emit(EEvents.FLOW_CDU, this._state, value);
  }

  setState(callback: (curState: TProps) => TProps) {
    const newState = callback(this.state);
    this.state = newState;
  }

  _registerEvents(eventBus: IEventBus<EEvents>) {
    eventBus.on(EEvents.INIT, this.init.bind(this));
    eventBus.on(EEvents.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(EEvents.FLOW_RENDER, this._render.bind(this));
    eventBus.on(EEvents.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    const block = this.render();
    this._element = this._createDocumentElement(block);
    if (this._element) {
      this._meta.tagName = this._element.tagName;
    }
  }

  init() {
    this._createResources();
    this.eventBus().emit(EEvents.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount(this._meta.props);

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }


  componentDidMount(_oldProps: TPropsObj<T>) {
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(EEvents.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: TProps, newProps: TProps) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this.eventBus().emit(EEvents.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: TProps, newProps: TProps) {
    return oldProps !== newProps;
  }

  setProps = (nextProps: Partial<TPropsObj<T>>) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _getChildren(propsAndChildren: TPropsObj<T>) {
    const children: Record<string, Block<Record<string, TProps>>> = {};
    const props: TPropsObj<Record<string, TProps>> = {};
    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _getCompileTemplate(template: string | void, props: TPropsObj<T>) {
    const compileTemplate = Handlebars.compile(template);
    const propsAndStubs: TPropsObj<Record<string, unknown>> = { ...props };
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });
    return compileTemplate(propsAndStubs);
  }

  _compile(template: string | void, props: TPropsObj<T>) {
    if (!template) {
      return;
    }
    const compileTemplate = this._getCompileTemplate(template, props);
    const fragment = document.createElement("template");
    fragment.innerHTML = this._getContentTemplate(compileTemplate);
    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      const content = child.getContent();
      if (content && stub) {
        stub.replaceWith(content);
      }
    });
    return fragment.content;
  }

  componentDidUnMount() {}

  _render() {
    const block = this.render();
    const el = this._getCompileTemplate(block, this.props);
    const updateContentNode = this._compile(el, this.props);
    if (this._element && updateContentNode) {
      this._element.innerHTML = ``;
      this._element.appendChild(updateContentNode);
      this._setAttributes(el);
      this._addEvents();
    }
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName: keyof typeof events) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName: keyof typeof events) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  render(): string | void {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: TPropsObj<T> & { _id: string }) {
    const self = this;
    const propsProxy = new Proxy(props, {
      set(target, props: string, value)  {
        self._removeEvents();
        const oldProp = target[props];
        if (self.children[props]) {
          self.children[props] = value;
        }
        target[props as keyof T] = value;
        self.eventBus().emit(EEvents.FLOW_CDU, oldProp, value);
        return true;
      },

      deleteProperty: function () {
        throw new Error("no permission");
      },
    });

    return propsProxy;
  }

  _createDocumentElement(block: string | void) {
    if (!block) {
      return document.createElement("div");
    }
    const tagName = this._getRootTagAndClass(block);
    return document.createElement(tagName);
  }

  _getRootTagAndClass(template: string) {
    const tagWithAttributes = /^<([^>]*)/.exec(template);
    const tag = /^([^\s]*)/.exec(tagWithAttributes ? tagWithAttributes[1] : "");
    return tag ? tag[1] : "div";
  }

  _setAttributes(template: string) {
    const tagWithAttributes = /^<([^>]*)/.exec(template);
    if (tagWithAttributes) {
      this._removeAttributes();
      const attributes = [
        ...tagWithAttributes[1].matchAll(/([^\s]*="[^"]+"(?=\s|))/g),
      ];
      attributes.forEach((el) => {
        const [key, value] = el[0]
          .split("=")
          .map((el) => el.replaceAll(`"`, ""));
        this._element?.setAttribute(key, value || "");
      });
    }
  }

  _removeAttributes() {
    while (this._element && this._element.attributes.length > 0) {
      this._element.removeAttribute(this._element.attributes[0].name);
    }
  }

  _getContentTemplate(template: string) {
    const removeAllLineBreak = template.replace(/(\r\n|\n|\r)/gm, "");
    const content = /^<[^>]*>(.*)<\/.*>$/.exec(removeAllLineBreak);
    return content ? content[1] : "";
  }

  show(style = "block") {
    if (this._element) {
      this._element.style.display = style;
    }
  }

  hide() {
    if (this._element) {
      this._element.style.display = "none";
    }
  }
}
