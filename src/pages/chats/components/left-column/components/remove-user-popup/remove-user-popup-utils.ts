import { Button } from "../../../../../../components";
import { CenterPageLayout } from "../../../../../../layouts";
import { ERouterEvents, eventBusRouter } from "../../../../../../utils";
import { ChatsAPI } from "../../../../chats-api";
import { TUser } from "../../../../chats-types";
import { UsersListTemplate } from "../add-user-popup/components";
import { RemoveUserPopupTemplate } from "./remove-user-popup";
import styles from "./remove-user-popup.module.scss";

const chatsApi = new ChatsAPI();

export const removeUserPopup = async (id?: string) => {
  try {
    if (!id) {
      return new CenterPageLayout({
        className: styles.popup_dark,
      });
    }
    const usersInChatResponse = await chatsApi.getChatUser(id);
    if (usersInChatResponse.status !== 200) {
      throw new Error("Не удалось получить собеседников");
    }
    const usersInChat: (TUser & { role: "admin" })[] = JSON.parse(
      usersInChatResponse.responseText,
    );
    const chatOwner = usersInChat.find((u) => u.role === "admin");
    const usersList = new UsersListTemplate({
      users: usersInChat.filter((u) => u.id !== chatOwner?.id),
      events: {
        click: async (e) => {
          try {
            const el = e.target as HTMLElement;
            const parent = el.closest("li");
            const userId = parent?.getAttribute("data-user-id");
            if (userId) {
              await chatsApi.removeUserFromChat(id, userId);
              eventBusRouter.emit(ERouterEvents.URL_CHANGE, "/messenger");
            }
          } catch (e) {
            console.log("Не удалось удалить пользователя");
          }
        },
      },
    });

    const removeButton = new Button({
      text: "Удалить",
      type: "submit",
      events: {
        click: async () => {
          try {
            // const users = await chatsApi.userSearch(state.value);
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
    const removePopup = new RemoveUserPopupTemplate({
      exitButton,
      removeButton,
      usersList,
    });

    const popup = new CenterPageLayout({
      className: styles.popup_dark,
      content: removePopup,
    });

    function closePopup() {
      popup.hide();
    }

    return popup;
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
};
