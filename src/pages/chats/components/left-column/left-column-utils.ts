import { Link } from "../../../../components";
import { ERouterEvents, eventBusRouter } from "../../../../utils";
import { ChatsAPI } from "../../chats-api";
import { TChats } from "../../chats-types";
import {
  ChatsTitle,
  createAddUserPopup,
  createChatPopup,
  Input,
} from "./components";
import { LeftColumnTemplate } from "./left-column";
import styles from "./left-column.module.scss";

const chatsApi = new ChatsAPI();

export function createLeftColumn(
  chats: TChats[],
  selectId: (id: string, filter?: string) => Promise<void>,
  filter = "",
) {
  const state: { chats: TChats[]; filter: string } = { chats, filter };
  const chatsList = new ChatsTitle({
    chats: state.chats,
    events: {
      click: async (e) => {
        const element = e.target as HTMLDivElement | HTMLButtonElement;
        const tag = element.getAttribute("data-type-button");
        const parent = element.closest("li");
        const chatId = parent?.getAttribute("data-chat-id");
        if (tag && chatId) {
          if (tag === "exit") {
            try {
              await chatsApi.delete(chatId);
              eventBusRouter.emit(
                ERouterEvents.URL_CHANGE,
                "/messenger",
                false,
              );
            } catch (e) {
              throw new Error("Не получилось удалить чат");
            }
          }

          if (tag === "add") {
            openAddUserPopup(chatId);
          }
        } else {
          if (chatId) {
            try {
              await selectId(chatId, state.filter);
            } catch (e) {
              throw new Error("Не удалось обновить данные");
            }
          }
        }
      },
    },
  });
  filterChats(state.filter);

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

  const newChatButton = new Link({
    content: "Создать чат",
    className: styles.leftColumn__link,
    events: {
      click: (e: Event) => {
        e.preventDefault();
        openCreateChatPopup();
      },
    },
  });

  let chatPopup = createChatPopup();
  closeCreateChatPopup();

  let addUserPopup = createChatPopup();
  addUserPopup.hide();

  function closeCreateChatPopup() {
    chatPopup.hide();
  }

  const searchInput = new Input({
    name: "message",
    value: state.filter,
    events: {
      input: (e) => {
        const input = e.target as HTMLInputElement;
        state.filter = input.value;
        filterChats(input.value);
      },
    },
  });
  const leftColumn = new LeftColumnTemplate({
    linkButton,
    newChatButton,
    createChatPopup: chatPopup,
    addUserPopup,
    searchInput,
    chatsList,
  });

  function openCreateChatPopup() {
    chatPopup = createChatPopup();
    leftColumn.setProps({ createChatPopup: chatPopup });
    chatPopup.show("flex");
  }

  function openAddUserPopup(chatId: string) {
    addUserPopup = createAddUserPopup(chatId);
    leftColumn.setProps({ addUserPopup });
    addUserPopup.show("flex");
  }

  function filterChats(filter: string) {
    const filterChats = chats.filter((chat) =>
      chat.title.match(new RegExp(filter)),
    );
    chatsList.setProps({ chats: filterChats });
  }

  return leftColumn;
}
