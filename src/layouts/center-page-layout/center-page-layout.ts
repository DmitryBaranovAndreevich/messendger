import { Block, IBlock, TProps, TPropsObj } from "../../modules";
import styles from "./center-page-layout.module.scss";

type TCenterPageLayout= {
  content: IBlock<Record<string, TProps>>;
  className?: string;
};

export class CenterPageLayout extends Block<TCenterPageLayout> {
  constructor(props: TPropsObj<TCenterPageLayout>) {
    super(props);
  }
  render() {
    return `<div class="${styles.centerPageTemplate} {{className}}">
              <div class="${styles.centerPageTemplate__root}" >
              {{{test}}}
                {{{content}}}
              </div>
            </div>`;
  }
}
