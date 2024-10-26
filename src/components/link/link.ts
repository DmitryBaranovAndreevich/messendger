import { Block, TPropsObj } from "../../modules";
import styles from "./link.module.scss";

type TLink = {
  content: string;
  className?: string;
  url: string;
};

export class Link extends Block<TLink> {
  constructor(props: TPropsObj<TLink>) {
    super(props);
  }

  render() {
    return `<a href="{{url}}" class="${styles.linkToPages} {{className}}" > 
              {{content}}
            </a>`;
  }
}
