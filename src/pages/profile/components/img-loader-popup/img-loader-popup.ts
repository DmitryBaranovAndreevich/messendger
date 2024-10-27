import { Block, TPropsObj } from "../../../../modules";
import { TImgLoader } from "./img-loader-popup-types";

export class ImgLoader extends Block<TImgLoader> {
  constructor(props: TPropsObj<TImgLoader>) {
    super(props);
  }
  render() {
    return `<div>
              {{{content}}}
            </div>`;
  }
}
