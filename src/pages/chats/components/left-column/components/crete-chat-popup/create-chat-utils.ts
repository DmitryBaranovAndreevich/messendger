import { Button, getInputWithItem } from "../../../../../../components";
import { CenterPageLayout } from "../../../../../../layouts";
import { ERouterEvents, eventBusRouter } from "../../../../../../utils";
import { ChatsAPI } from "../../../../chats-api";
import { ChatPopupTemplate } from "./create-chat-popup";
import styles from "./create-chat-popup.module.scss";

const chatsApi = new ChatsAPI();

export function createChatPopup() {
  const { inputWithItem, state } = getInputWithItem({
    item: "Имя чата",
    error: "Введите имя",
    type: "text",
    name: "title",
    disabled: false,
  });

  const submitButton = new Button({
    text: "Сохранить",
    type: "submit",
  });

  const exitButton = new Button({
    text: "Выйти",
    type: "buttton",
    className: styles.exitButton,
    events: {
      click: closePopup,
    },
  });

  const chatTitleTemplate = new ChatPopupTemplate({
    input: inputWithItem,
    button: submitButton,
    exitButton,
    events: {
      submit: async (e) => {
        e.preventDefault();
        await chatsApi.create(state.value);
        eventBusRouter.emit(ERouterEvents.URL_CHANGE, "/messenger", false);
      },
    },
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
