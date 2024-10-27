import { Block, TPropsObj } from "../../../../modules";
import { TButton } from "./button-types";
import styles from "./button.module.scss";

export class Button extends Block<TButton> {
  constructor(props: TPropsObj<TButton>) {
    super(props);
  }
  render() {
    return `<button class="${styles.button} {{className}}">
              {{{content}}}
            </button>`;
  }
}
