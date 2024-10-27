import { ChatsTemplate } from "./chats";
import { CHATS_LIST } from "./chats-constants";
import { createRightColumn, createLeftColumn } from "./components";
import styles from "./chats.module.scss";

export function createChatsPage() {
  const contentColumn = createRightColumn();
  const chatsColumn = createLeftColumn(CHATS_LIST, setActiveChatId);
  const chatsTemplate = new ChatsTemplate({
    chatsColumn,
    contentColumn,
  });

  function setActiveChatId(id: string) {
    const updateConfig = CHATS_LIST.map((el) => {
      if (el.id === id) {
        return { ...el, activeChat: styles.activeChat };
      }

      return el;
    });
    chatsTemplate.setProps({
      chatsColumn: createLeftColumn(updateConfig, setActiveChatId),
      contentColumn: createRightColumn(updateConfig.find((el) => el.id === id)?.comment),
    });
  }

  return chatsTemplate;
}
