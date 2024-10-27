import { Block, TPropsObj } from "../../modules";

type TInput = {
  type: string;
  name: string;
  className: string;
  disabled: boolean;
};

export class Input extends Block<TInput> {
  constructor(props: TPropsObj<TInput>) {
    super(props);
  }

  render() {
    return `<input
                class="{{className}}"
                type="{{type}}"
                name="{{name}}"
                required="true"
                disabled={{disabled}}
            />
             `;
  }
}
