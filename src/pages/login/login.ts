import { Block, TPropsObj } from "../../modules";
import { TLoginTemplate } from "./login-types";
import styles from "./login.module.scss";

export class LoginTemplate extends Block<TLoginTemplate> {
  constructor(props: TPropsObj<TLoginTemplate>) {
    super(props);
  }
  render() {
    return `<div class="${styles.loginPage}">
                <p class="${styles.loginPage__title}">Вход<p/>
                <form class="${styles.loginPage__formWrapper}" name="loginForm" novalidate>
                  {{{login}}}
                  {{{password}}}
                  {{{buttonSubmit}}}
                </form>
                {{{link}}}
              </div>`;
  }
}
