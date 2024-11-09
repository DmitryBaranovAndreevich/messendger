import { Block, TPropsObj } from "../../../../modules";
import { TImgLoaderForm } from "./img-loader-popup-types";
import styles from "./img-loader-popup.module.scss";

export class ImgLoadForm extends Block<TImgLoaderForm> {
  constructor(props: TPropsObj<TImgLoaderForm>) {
    super(props);
  }
  render() {
    return `<div class="${styles.imgLoader}">
              <p class="${styles.imgLoader__title}">Загрузите файл</p>
              <form class="${styles.imgLoader__form}">
                <label class="${styles.imgLoader__inputLabel}" for="${styles.imgLoader__input}">Выбрать файл на компьютере</label>
                {{{fileLabel}}}
                <input id="${styles.imgLoader__input}" name="avatar" type="file" />
                {{{submitButton}}}
                {{{exitButton}}}
                {{{errorLabel}}}
              </form>
            </div>`;
  }
}
