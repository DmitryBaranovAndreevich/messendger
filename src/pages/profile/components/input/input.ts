import { Block, TPropsObj } from "../../../../modules";
import { TInput } from "./input-types";
import styles from "./input.module.scss";

export class Input extends Block<TInput> {
  constructor(props: TPropsObj<TInput>) {
    super(props);
  }
  render() {
    return `<input value="{{value}}" class="${styles.input}" {{{disabled}}} name="{{name}}" type="{{type}}"/>`;
  }
}
