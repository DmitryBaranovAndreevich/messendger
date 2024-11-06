import { Block, render, TProps } from "../block";
import { isEqual } from "./router-utils";

export class Route {
  _pathname;
  _blockClass;
  _block: Block<Record<string, TProps>> | null;
  _props;
  constructor(
    pathname: string,
    view: () => Block<Record<string, TProps>>,
    props: TProps & { root: string },
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block = null;
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = this._blockClass();
      render(this._props.root, this._block);
      return;
    }
  }
}
