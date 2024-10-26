import { Block, TPropsObj } from "../../../../modules";
import { TRightColumnTemplate } from "./right-column-types";
import styles from "./right-column.module.scss";

export class RightColumnTemplate extends Block<TRightColumnTemplate> {
  constructor(props: TPropsObj<TRightColumnTemplate>) {
    super(props);
  }
  render() {
    return `<div class="${styles.rightColumn}">
              {{{content}}}
              {{{message}}}
            </div>`;
  }
}
