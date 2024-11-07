import { Link } from "../../../../components";
import { ERouterEvents, eventBusRouter } from "../../../../utils";
import { ChatsTitle, Input } from "./components";
import { LeftColumnTemplate } from "./left-column";
import { TChatsData } from "./left-column-types";
import styles from "./left-column.module.scss";

export function createLeftColumn(
  chats: TChatsData[],
  selectId: (id: string) => void,
) {
  const chatsList = new ChatsTitle({
    chats: chats.map((el) => ({
      ...el,
      comment: el.comment[el.comment.length - 1],
    })),
    events: {
      click: (e) => {
        const element = e.target as HTMLElement;
        const parent = element.closest("li");
        const activeChat = parent?.getAttribute("data-chat-id");
        if (activeChat) {
          selectId(activeChat);
        }
      },
    },
  });

  const linkButton = new Link({
    content: "В профиль >",
    url: `${window.location.origin}/settings`,
    className: styles.leftColumn__link,
    events: {
      click: (e: Event) => {
        e.preventDefault();
        const a = e.target as HTMLLinkElement;
        const url = new URL(a.href);
        eventBusRouter.emit(ERouterEvents.URL_CHANGE, url.pathname);
      },
    },
  });

  const searchInput = new Input({ name: "message" });
  const leftColumn = new LeftColumnTemplate({
    linkButton,
    searchInput,
    chatsList,
  });

  return leftColumn;
}
