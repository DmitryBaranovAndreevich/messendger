import { Block, TPropsObj } from "../../modules";
import styles from "./main.module.scss";

export class MainTemplate extends Block<{}> {
  constructor(props: TPropsObj<{}>) {
    super(props);
  }
  render() {
    return `<nav>
              <ul class="${styles.menu}">
                <li class="${styles.menu__item}">
                    <a href="./500">500</a>
                </li>
                <li class="${styles.menu__item}">
                    <a href="./400">404</a>
                </li>
                <li class="${styles.menu__item}">
                    <a href="./login">login</a>
                </li>
                <li class="${styles.menu__item}">
                    <a href="./register">register</a>
                </li>
                <li class="${styles.menu__item}">
                    <a href="./profile">profile</a>
                </li>
                <li class="${styles.menu__item}">
                    <a href="./chats">chats</a>
                </li>
              </ul>
            </nav>`;
  }
}
