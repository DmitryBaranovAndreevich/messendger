import { Block, TPropsObj } from "../../modules";
import styles from "./register.module.scss";
import { TRegisterTemplate } from "./register-types";

export class RegisterTemplate extends Block<TRegisterTemplate> {
  constructor(props: TPropsObj<TRegisterTemplate>) {
    super(props);
  }
  render() {
    return `<div class="${styles.registerPage}">
                <p class="${styles.registerPage__title}">Регистрация</p>
                <form class="${styles.registerPage__formWrapper}" name="registerForm" novalidate>
                  {{{email}}}
                  {{{login}}}
                  {{{first_name}}}
                  {{{second_name}}}
                  {{{phone}}}
                  {{{password}}}
                  {{{repeat_password}}}     
                  {{{buttonSubmit}}}
                </form>
                {{{link}}}
              </div>`;
  }
}
