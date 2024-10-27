import { Block, TPropsObj } from "../../modules";
import { TChatsTemplate } from "./chats-types";
import styles from "./chats.module.scss";

export class ChatsTemplate extends Block<TChatsTemplate> {
  constructor(props: TPropsObj<TChatsTemplate>) {
    super(props);
  }
  render() {
    return `<div class="${styles.chatsPage}">
              {{{chatsColumn}}}
              {{{contentColumn}}}
            </div>`;
  }
}
