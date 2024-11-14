import { Block, TPropsObj } from "../../../../../../modules";
import { TRemoveUserPopupTemplate } from "./remove-user-popup-types";
import styles from "./remove-user-popup.module.scss";

export class RemoveUserPopupTemplate extends Block<TRemoveUserPopupTemplate> {
  constructor(props: TPropsObj<TRemoveUserPopupTemplate>) {
    super(props);
  }
  render() {
    return `<div class="${styles.popup}"> 
                <label>Удалить пользователя из чата</label>
                {{{usersList}}}
                {{{exitButton}}}
            </div>`;
  }
}
