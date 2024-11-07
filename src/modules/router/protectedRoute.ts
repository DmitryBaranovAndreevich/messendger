import { ERouterEvents, eventBusRouter, getCookie } from "../../utils";
import { Block, TProps } from "../block";
import { Route } from "./route";

export class ProtectedRoute extends Route {
  constructor(
    pathname: string,
    view: () => Block<Record<string, TProps>>,
    props: TProps & { root: string },
  ) {
    super(pathname, view, props);
  }

  render() {
    const isLogin = getCookie("isLogin");
    if (!isLogin) {
      eventBusRouter.emit(ERouterEvents.URL_CHANGE, "/");
      return;
    }
    super.render();
  }
}
