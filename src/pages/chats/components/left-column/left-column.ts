import { Block, TPropsObj } from "../../../../modules";
import { TLeftColumnTemplate } from "./left-column-types";
import styles from "./left-column.module.scss";

export class LeftColumnTemplate extends Block<TLeftColumnTemplate> {
  constructor(props: TPropsObj<TLeftColumnTemplate>) {
    super(props);
  }
  render() {
    return `<div class="${styles.leftColumn}">
              {{{linkButton}}}
              <form>
                {{{searchInput}}}
              </form>  
              {{{chatsList}}}
            </div>`;
  }
}
