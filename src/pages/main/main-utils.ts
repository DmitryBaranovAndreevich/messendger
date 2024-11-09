import { LoginRoute, ProtectedRoute, Router } from "../../modules";
import { createChatsPage } from "../chats";
import { createErrorPage } from "../error-page";
import { createLoginPage } from "../login";
import { createProfile } from "../profile";
import { createRegister } from "../register";
import { ERouterEvents, eventBusRouter } from "../../utils";

const router = new Router("#root");

eventBusRouter.on(ERouterEvents.URL_CHANGE, (route: string, flag?: boolean) =>
  router.go.call(router, route, flag),
);

router
  .use("/", () => createLoginPage(), LoginRoute)
  .use("/sign-up", () => createRegister(), LoginRoute)
  .use("/settings", () => createProfile(), ProtectedRoute)
  .use("/messenger", () => createChatsPage(), ProtectedRoute)
  .use("/400", () =>
    createErrorPage({ content: "Не туда попали", title: "404" }),
  )
  .use("/500", () =>
    createErrorPage({ content: "Мы уже фиксим", title: "500" }),
  )
  .start();
