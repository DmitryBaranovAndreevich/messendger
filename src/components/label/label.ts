import { Block, TPropsObj } from "../../modules";

type TLabel = {
  content: string;
  className: string;
};

export class Label extends Block<TLabel> {
  constructor(props: TPropsObj<TLabel>) {
    super(props);
  }

  render() {
    return `<label class="{{className}}" >{{content}}</label>`;
  }
}
