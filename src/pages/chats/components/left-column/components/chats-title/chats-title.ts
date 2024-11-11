import { Block, TPropsObj } from "../../../../../../modules";
import { TChatsTitle } from "./chats-title-types";
import styles from "./chats-title.module.scss";

export class ChatsTitle extends Block<TChatsTitle> {
  constructor(props: TPropsObj<TChatsTitle>) {
    super(props);
  }
  render() {
    return `<ul class="${styles.chatsTitle__wrapper}">
            {{#each chats}}
            <li class="${styles.chatsTitle} {{activeChat}}" data-chat-id="\{{id}}">
              <img class="${styles.chatsTitle__img}" src="\{{avatar}}" alt="chat logo"/>
                <div class="${styles.chatsTitle__titleWrapper}">
                  <p class="${styles.chatsTitle__title}">\{{title}}</p>
                  <label class="${styles.chatsTitle__comment}">
                    {{#if last_message.owner}}
                      <label class="${styles.chatsTitle__label}">Вы: </label>
                    {{/if}}
                    \{{last_message.content}}
                   </label>
                </div>
                <div class="${styles.chatsTitle__timerWrapper}">
                 <p class="${styles.chatsTitle__time}">
                   \{{time}}
                 </p>
                  {{#if unread_count}}
                 <div class="${styles.chatsTitle__counterWrapper}">
                  <p class="${styles.chatsTitle__counter}">\{{unread_count}}</p>
                 </div>
                 {{/if}}
                </div>
                <div class="${styles.chatsTitle__control}">
                 <button data-type-button="exit" class="${styles.chatsTitle__controlButtons}">Удалить чат</button>
                 <button data-type-button="add" class="${styles.chatsTitle__controlButtons}">Добавить собеседника</button>
                </div>
            </li>
            {{/each}}
             </ul>`;
  }
}
