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
              <img class="${styles.chatsTitle__img}" src="\{{url}}" alt="chat logo"/>
                <div class="${styles.chatsTitle__titleWrapper}">
                  <p class="${styles.chatsTitle__title}">\{{title}}</p>
                  <label class="${styles.chatsTitle__comment}">
                    {{#if comment.owner}}
                      <label class="${styles.chatsTitle__label}">Вы: </label>
                    {{/if}}
                    \{{comment.text}}
                   </label>
                </div>
                <div class="${styles.chatsTitle__timerWrapper}">
                 <p class="${styles.chatsTitle__time}">
                   \{{time}}
                 </p>
                 <div class="${styles.chatsTitle__counterWrapper}">
                   <p class="${styles.chatsTitle__counter}">\{{count}}</p>
                 </div>
                </div>
            </li>
            {{/each}}
             </ul>`;
  }
}
