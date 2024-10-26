import { Block, TPropsObj } from "../../modules";
import { Input } from "../input";
import { Label } from "../label/label";
import styles from "./input-with-item.module.scss";

type TInputWithItem = {
  item: string;
  error: string;
  input: Input;
  itemLabel: Label;
  errorLabel: Label;
};

export class InputWithItem extends Block<TInputWithItem> {
  constructor(props: TPropsObj<TInputWithItem>) {
    super(props);
  }

  render() {
    return `<div class="${styles.inputWithItem}" >
              {{{input}}}
              {{{itemLabel}}}
              {{{errorLabel}}}
            </div>`;
  }
}
