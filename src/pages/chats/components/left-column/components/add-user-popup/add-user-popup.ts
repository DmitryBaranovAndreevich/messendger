import { Block, TPropsObj } from "../../../../../../modules";
import { TAddUserPopupTemplate } from "./add-user-popup-types";
import styles from "./add-user-popup.module.scss";

export class AddUserPopupTemplate extends Block<TAddUserPopupTemplate> {
  constructor(props: TPropsObj<TAddUserPopupTemplate>) {
    super(props);
  }
  render() {
    return `<div class="${styles.popup}"> 
              <div class="${styles.popup__form}">
                <label>Добавить пользователя в чат</label>
                {{{input}}}
                {{{button}}}
              </div>
              {{{usersList}}}
              {{{exitButton}}}
            </div>`;
  }
}
