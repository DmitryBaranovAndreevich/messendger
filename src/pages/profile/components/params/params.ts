import { Block, TPropsObj } from "../../../../modules";
import { TParams } from "./params-types";
import styles from "./params.module.scss";

export class Params extends Block<TParams> {
  constructor(props: TPropsObj<TParams>) {
    super(props);
  }
  render() {
    return `<li class="${styles.params}">
              <p class="${styles.params__title}">{{label}}</p>
              {{{input}}}
              {{{errorLabel}}}
            </li>`;
  }
}
