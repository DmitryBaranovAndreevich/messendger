import { Block, TPropsObj } from "../../../../../../../../modules";
import { TUsersListTemplate } from "./users-list-types";
import styles from "./users-list.module.scss";

export class UsersListTemplate extends Block<TUsersListTemplate> {
  constructor(props: TPropsObj<TUsersListTemplate>) {
    super(props);
  }
  render() {
    return `<ul class="${styles.popup}"> 
              {{#each users}}
                <li class="${styles.userTitle}" data-user-id="\{{id}}">
                  <p>Login : \{{login}}</p>
                  <p>Name: \{{first_name}}</p>
                  <p>Family: \{{second_name}}</p>
                </li>
              {{/each}}
            </ul>`;
  }
}
