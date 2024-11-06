import { Router } from "../../modules";
import { createChatsPage } from "../chats";
import { createErrorPage } from "../error-page";
import { createLoginPage } from "../login";
import { createProfile } from "../profile";
import { createRegister } from "../register";
import { ERouterEvents, eventBusRouter } from "../utils";

const router = new Router("#root");

router
  .use("/", () => createLoginPage())
  .use("/sign-up", () => createRegister())
  .use("/settings", () => createProfile())
  .use("/messenger", () => createChatsPage())
  .use("/400", () =>
    createErrorPage({ content: "Не туда попали", title: "404" }),
  )
  .use("/500", () =>
    createErrorPage({ content: "Мы уже фиксим", title: "500" }),
  )
  .start();

eventBusRouter.on(ERouterEvents.URL_CHANGE, (route: string) =>
  router.go.call(router, route),
);

window.addEventListener("popstate", function () {
  eventBusRouter.emit(ERouterEvents.URL_CHANGE);
});
