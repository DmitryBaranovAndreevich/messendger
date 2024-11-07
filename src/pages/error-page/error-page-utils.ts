import { Link } from "../../components";
import { CenterPageLayout } from "../../layouts";
import { ERouterEvents, eventBusRouter } from "../../utils";
import { ErrorPageTemplate } from "./error-page";
import styles from "./error-page.module.scss";

export function createErrorPage({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const link = new Link({
    content: "На страницу чатов",
    url: `${window.location.origin}/messenger`,
    className: styles.errorPage__link,
    events: {
      click: (e: Event) => {
        e.preventDefault();
        const a = e.target as HTMLLinkElement;
        const url = new URL(a.href);
        eventBusRouter.emit(ERouterEvents.URL_CHANGE, url.pathname);
      },
    },
  });

  const errorPageTemplate = new ErrorPageTemplate({
    title,
    content,
    link,
  });

  return new CenterPageLayout({
    className: "loginPage",
    content: errorPageTemplate,
  });
}
