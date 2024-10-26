import { Block, TPropsObj } from "../../../../../../modules";
import { TChat } from "./chat-types";
import styles from "./chat.module.scss";

export class Chat extends Block<TChat> {
  constructor(props: TPropsObj<TChat>) {
    super(props);
  }
  render() {
    return `<ul class="${styles.chats}">
              {{#each chats}}
                <li class="${styles.chats__container}" >
                  {{#if owner}}
                    <div class="${styles.chats__mes} ${styles.chats__ownerMes}">
                       <label>\{{text}}</label>
                       <p class="${styles.chats__time}">\{{time}}</p>
                    </div>
                  {{else}} 
                    <div class="${styles.chats__mes} ${styles.chats__anotherMes}">
                      <label>\{{text}}</label>
                      <p class="${styles.chats__time}">\{{time}}</p>
                    </div>
                  {{/if}}
                </li>
              {{/each}}
             </ul>`;
  }
}
