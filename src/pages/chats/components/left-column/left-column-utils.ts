import { Link } from "../../../../components";
import { ERouterEvents, eventBusRouter } from "../../../../utils";
import { ChatsAPI } from "../../chats-api";
import { TChats } from "../../chats-types";
import {
  ChatsTitle,
  createAddUserPopup,
  createChatPopup,
  Input,
  removeUserPopup,
} from "./components";
import { LeftColumnTemplate } from "./left-column";
import styles from "./left-column.module.scss";

const chatsApi = new ChatsAPI();

export async function createLeftColumn(
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
              console.log("Не получилось удалить чат");
            }
          }

          if (tag === "add") {
            openAddUserPopup(chatId);
          }

          if (tag === "remove") {
            await openRemoveUserPopup(chatId);
          }
        } else {
          if (chatId) {
            try {
              await selectId(chatId, state.filter);
            } catch (e) {
              console.log("Не удалось обновить данные");
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

  const removePopup = await removeUserPopup();
  removePopup?.hide();

  const leftColumn = new LeftColumnTemplate({
    linkButton,
    newChatButton,
    createChatPopup: chatPopup,
    addUserPopup,
    searchInput,
    removeUserPopup: removePopup,
    chatsList,
  });

  async function openRemoveUserPopup(chatId: string) {
    const removePopup = await removeUserPopup(chatId);
    leftColumn.setProps({ removeUserPopup: removePopup });
  }

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
