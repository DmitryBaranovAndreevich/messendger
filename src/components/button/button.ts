import { Block, TPropsObj } from "../../modules";
import styles from "./button.module.scss";

type TButton = {
  text: string;
  type: string;
  className?: string;
};

export class Button extends Block<TButton> {
  constructor(props: TPropsObj<TButton>) {
    super(props);
  }
  render() {
    return `<button class="${styles.button} {{className}}" type="{{type}}">{{text}}</button>`;
  }
}
