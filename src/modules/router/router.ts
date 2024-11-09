import { Block, TProps } from "../block";
import { Route } from "./route";

const ROOT_ID = "#root";

export class Router {
  static __instance: Router | undefined;
  routes: Route[] = [];
  history: History | undefined;
  _currentRoute: Route | undefined;
  _rootQuery: string = ROOT_ID;
  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(
    pathname: string,
    block: () => Promise<Block<Record<string, TProps>> | undefined>,
    RouteClass = Route,
  ) {
    const route = new RouteClass(pathname, block, { root: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      if (event.currentTarget) {
        this._onRoute((event.currentTarget as Window).location.pathname);
      }
    };
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    let route = this.getRoute(pathname);

    if (!route) {
      this.history?.replaceState({}, "", "/400");
      route = this.getRoute(pathname);
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    route?.render();
  }

  go(pathname: string) {
    this.history?.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history?.back();
  }

  forward() {
    window.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => {
      return route.match(pathname);
    });
  }
}
