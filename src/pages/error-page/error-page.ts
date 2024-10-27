import { Block, TPropsObj } from "../../modules";
import styles from "./error-page.module.scss";
import { TErrorPageTemplate } from "./error-page-types";

export class ErrorPageTemplate extends Block<TErrorPageTemplate> {
  constructor(props: TPropsObj<TErrorPageTemplate>) {
    super(props);
  }
  render() {
    return `<div class="${styles.errorPage__container}">
              <p class="${styles.errorPage__title}">{{title}}</p>
              <p class="${styles.errorPage__content}">{{content}}</p>
              {{{link}}}
            </div>`;
  }
}
