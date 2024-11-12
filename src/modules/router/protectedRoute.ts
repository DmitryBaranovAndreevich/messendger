import { ERouterEvents, eventBusRouter, getCookie } from "../../utils";
import { Block, TProps } from "../block";
import { Route } from "./route";

export class ProtectedRoute extends Route {
  constructor(
    pathname: string,
    view: () => Promise<Block<Record<string, TProps>> | undefined>,
    props: TProps & { root: string },
  ) {
    super(pathname, view, props);
  }

  async render() {
    const isLogin = getCookie("login");

    if (!isLogin) {
      eventBusRouter.emit(ERouterEvents.URL_CHANGE, "/");
      return;
    }
    super.render();
  }
}
