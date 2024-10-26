import { EventBus } from "../modules";

export const eventBusRouter = new EventBus<ERouterEvents>();

export enum ERouterEvents {
  URL_CHANGE = "url_change",
}
