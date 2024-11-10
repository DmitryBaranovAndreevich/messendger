import { ChatsTemplate } from "./chats";
import { createRightColumn, createLeftColumn } from "./components";
import styles from "./chats.module.scss";
import { ChatsAPI } from "./chats-api";
import { ERouterEvents, eventBusRouter } from "../../utils";
import { TChats, TUser } from "./chats-types";
import defaultImg from "../../icons/favicon.svg";
import { getDataStr } from "./chats-constants";

const chatsApi = new ChatsAPI();

export async function createChatsPage() {
  try {
    const userChats = await chatsApi.request();
    const userResponse = await chatsApi.getUser();
    if (userChats.status !== 200 || userResponse.status !== 200) {
      throw new Error("Проблема с  загрузкой даных");
    }
    const user: TUser = JSON.parse(userResponse.responseText);
    const chats: TChats[] = (
      JSON.parse(userChats.responseText) as TChats[]
    ).map((el) =>
      el.last_message
        ? {
            ...el,
            time: getDataStr(el.created_by),
            avatar: el.avatar
              ? `https://ya-praktikum.tech/api/v2/resources${el.avatar}`
              : defaultImg,
            last_message: {
              ...el.last_message,
              owner: el.last_message.user.id === user.id,
            },
          }
        : {
            ...el,
            time: getDataStr(el.created_by),
            avatar: el.avatar
              ? `https://ya-praktikum.tech/api/v2/resources${el.avatar}`
              : defaultImg,
          },
    );
    const contentColumn = await createRightColumn(user);
    const chatsColumn = createLeftColumn(chats, setActiveChatId);
    const chatsTemplate = new ChatsTemplate({
      chatsColumn,
      contentColumn,
    });

    async function setActiveChatId(id: string) {
      const updateConfig = chats.map((el) => {
        if (String(el.id) === String(id)) {
          return { ...el, activeChat: styles.activeChat };
        }

        return el;
      });
      const rightColumn = await createRightColumn(
        user,
        updateConfig.find((el) => String(el.id) === String(id)),
      );
      chatsTemplate.setProps({
        chatsColumn: createLeftColumn(updateConfig, setActiveChatId),
        contentColumn: rightColumn,
      });
    }

    return chatsTemplate;
  } catch (e) {
    if (e instanceof Error) {
      eventBusRouter.emit(ERouterEvents.URL_CHANGE, "/400");
      console.log(e.message);
    }
  }
}
