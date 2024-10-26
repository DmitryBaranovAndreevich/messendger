import { Block, TPropsObj } from "../../../../../../modules";
import styles from "./no-chats-title.module.scss";

export class NoChatsTitle extends Block<{}> {
  constructor(props: TPropsObj<{}>) {
    super(props);
  }
  render() {
    return `<div class="${styles.noChatsTitle}">
              <p class="${styles.noChatsTitle__message}">Выберите чат чтобы отправить сообщение</p>
            </div>`;
  }
}
