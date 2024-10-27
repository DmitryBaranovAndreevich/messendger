import { Block, TPropsObj } from "../../../../../../modules";
import styles from "./message-utils.module.scss";

export class Message extends Block<{}> {
  constructor(props: TPropsObj<{}>) {
    super(props);
  }
  render() {
    return `<form class="${styles.message}">
              <input class="${styles.message__input}" placeholder="Сообщение" type="text" name="message"/>
              <button class="${styles.message__button}" type="submit">></button>
            </form>`;
  }
}
