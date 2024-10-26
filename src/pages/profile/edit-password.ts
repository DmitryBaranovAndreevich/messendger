import { Block, TPropsObj } from "../../modules";
import { TEditPasswordTemplate } from "./profile-types";
import avatarImg from "../../icons/imgLoader.svg";
import styles from "./profile.module.scss";

export class EditPasswordTemplate extends Block<TEditPasswordTemplate> {
  constructor(props: TPropsObj<TEditPasswordTemplate>) {
    super(props);
  }
  render() {
    return `<div class="${styles.profile}">
                <div class="${styles.profile__imgLoader}">
                  <img src="${avatarImg}" alt="Поменять аватар" class="${styles.profile__img}">
                  {{{changeAvatarButton}}}
                </div>
                <form novalidate>
                  <ul class="${styles.profile__userParamsContainer}">
                    {{{oldPass}}}
                    {{{newPass}}}
                    {{{repeat_newPass}}}
                  </ul>
                  {{{submitButton}}}
                </form>
                {{{popup}}}
              </div>`;
  }
}
