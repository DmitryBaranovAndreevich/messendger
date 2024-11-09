import { ERouterEvents, eventBusRouter, getCookie } from "../../utils";
import { Block, TProps } from "../block";
import { Route } from "./route";

export class LoginRoute extends Route {
  constructor(
    pathname: string,
    view: () => Promise<Block<Record<string, TProps>>>,
    props: TProps & { root: string },
  ) {
    super(pathname, view, props);
  }

  async render() {
    const isLogin = getCookie("login");
    if (isLogin) {
      eventBusRouter.emit(ERouterEvents.URL_CHANGE, "/messenger");
      return;
    }
    super.render();
  }
}
