import { Block, TPropsObj } from "../../../../modules";
import { TLeftColumnTemplate } from "./left-column-types";
import styles from "./left-column.module.scss";

export class LeftColumnTemplate extends Block<TLeftColumnTemplate> {
  constructor(props: TPropsObj<TLeftColumnTemplate>) {
    super(props);
  }
  render() {
    return `<div class="${styles.leftColumn}">
             <div class="${styles.leftColumn__links}">
              {{{newChatButton}}}
              {{{linkButton}}}
             </div> 
              <form>
                {{{searchInput}}}
              </form>  
              {{{chatsList}}}
              {{{createChatPopup}}}
              {{{addUserPopup}}}
            </div>`;
  }
}
