import { Block, TPropsObj } from "../../../../modules";
import { TImgName } from "./img-loader-popup-types";
import styles from "./img-loader-popup.module.scss";

export class ImgName extends Block<TImgName> {
  constructor(props: TPropsObj<TImgName>) {
    super(props);
  }
  render() {
    return `<div class="${styles.imgLoader}">
              <p class="${styles.imgLoader__title}">Файл загружен</p>
              <p class="${styles.imgLoader__title}">{{fileName}}</p>
                {{{okButton}}}
            </div>`;
  }
}
