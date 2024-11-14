import { Button, getInputWithItem } from "../../../../../../components";
import { CenterPageLayout } from "../../../../../../layouts";
import { ERouterEvents, eventBusRouter } from "../../../../../../utils";
import { ChatsAPI } from "../../../../chats-api";
import { AddUserPopupTemplate } from "./add-user-popup";
import { UsersListTemplate } from "./components";
import styles from "./add-user-popup.module.scss";

const chatsApi = new ChatsAPI();

export function createAddUserPopup(chatId: string) {
  const usersList = new UsersListTemplate({
    users: [],
    events: {
      click: async (e) => {
        try {
          const el = e.target as HTMLElement;
          const parent = el.closest("li");
          const userId = parent?.getAttribute("data-user-id");
          if (userId) {
            await chatsApi.addUserToChat(chatId, userId);
            eventBusRouter.emit(ERouterEvents.URL_CHANGE, "/messenger");
          }
        } catch (e) {
          console.log("Не удалось добавить пользователя");
        }
      },
    },
  });
  const { inputWithItem, state } = getInputWithItem({
    item: "Имя пользователя",
    error: "Введите имя",
    type: "text",
    name: "title",
    disabled: false,
  });

  const submitButton = new Button({
    text: "Найти",
    type: "submit",
    events: {
      click: async () => {
        try {
          const users = await chatsApi.userSearch(state.value);
          if (users.status === 200) {
            usersList.setProps({ users: JSON.parse(users.responseText) });
          }
        } catch (e) {
          console.log("Не удалось найти пользователей");
        }
      },
    },
  });

  const exitButton = new Button({
    text: "Выйти",
    type: "buttton",
    className: styles.exitButton,
    events: {
      click: closePopup,
    },
  });

  const chatTitleTemplate = new AddUserPopupTemplate({
    input: inputWithItem,
    button: submitButton,
    exitButton,
    usersList,
  });
  const popup = new CenterPageLayout({
    className: styles.popup_dark,
    content: chatTitleTemplate,
  });

  function closePopup() {
    popup.hide();
  }

  return popup;
}
