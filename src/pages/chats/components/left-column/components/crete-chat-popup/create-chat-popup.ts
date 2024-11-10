import { Block, TPropsObj } from "../../../../../../modules";
import { TChatPopupTemplate } from "./create-chat-popup-types";
import styles from "./create-chat-popup.module.scss";

export class ChatPopupTemplate extends Block<TChatPopupTemplate> {
  constructor(props: TPropsObj<TChatPopupTemplate>) {
    super(props);
  }
  render() {
    return `<div class="${styles.popup}"> 
              <form class="${styles.popup__form}">
                <label>Создать чат</label>
                {{{input}}}
                {{{button}}}
              </form>
              {{{exitButton}}}
            </div>`;
  }
}
