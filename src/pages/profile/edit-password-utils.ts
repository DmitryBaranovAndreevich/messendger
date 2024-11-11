import { changePassConfig } from "./profile-constants";
import { TEditPasswordTemplate, TUserInfo } from "./profile-types";
import { Button, createImgPopup, creteParams, Params } from "./components";
import { Button as SubmitButton } from "../../components";
import { EditPasswordTemplate } from "./edit-password";
import styles from "./profile.module.scss";
import { CenterPageLayout } from "../../layouts";
import { ProfileAPI } from "./profile-api";
import defaultAvatarImg from "../../icons/imgLoader.svg";

const profileAPIInstance = new ProfileAPI();

export function createEditPasswordTemplate(
  goToProfile: () => void,
  userData: TUserInfo,
) {
  const params = changePassConfig.map((el) =>
    creteParams({
      errorMessage: el.errorMessage,
      type: el.type,
      disabled: "",
      name: el.name,
      label: el.label,
      value: el.value,
      validateFunc: el.validateFunc,
    }),
  );

  const htmlElements = params.reduce(
    (acc, el, index) => ({
      ...acc,
      [changePassConfig[index].name]: el.component,
    }),
    {} as Record<keyof TEditPasswordTemplate, Params>,
  );

  function validateForm() {
    params.forEach((el) => el.validateInput());
    const isError = params.find((el) => el.state.isError);
    return !isError;
  }

  function getFormValues() {
    return params.reduce(
      (acc, el, index) => ({
        ...acc,
        [changePassConfig[index].name]: el.state.value,
      }),
      {} as Record<keyof TEditPasswordTemplate, string>,
    );
  }

  const submitButton = new SubmitButton({
    type: "submit",
    text: "Сохранить",
  });

  const changeAvatarButton = new Button({
    content: "Поменять аватар",
    className: styles.profile__changeAvatar,
    events: {
      click: openChangeAvatarPopup,
    },
  });

  const popup = new CenterPageLayout({
    className: styles.profile_dark,
    content: createImgPopup(goToEditPassTemplate),
  });

  popup.hide();

  function openChangeAvatarPopup() {
    popup.show("flex");
  }

  function goToEditPassTemplate() {
    popup.hide();
  }

  const editProfileTemplate = new EditPasswordTemplate({
    ...htmlElements,
    submitButton,
    changeAvatarButton,
    avatarImg: userData.avatar
      ? `https://ya-praktikum.tech/api/v2/resources${userData.avatar}`
      : defaultAvatarImg,
    popup,
    events: {
      submit: async (e) => {
        try {
          e.preventDefault();
          const isValid = validateForm();
          const password = params.find((el) => el.name === "password");
          const repeatPasssword = params.find(
            (el) => el.name === "repeat_newPass",
          );
          if (isValid) {
            const { oldPass, newPass, repeat_newPass } = getFormValues();
            if (newPass !== repeat_newPass) {
              password?.showError("Пароли не совпадают");
              repeatPasssword?.showError("Пароли не совпадают");
              return;
            }

            const response = await profileAPIInstance.editPass({
              oldPassword: oldPass,
              newPassword: newPass,
            });
            if (response.status === 200) {
              goToProfile();
            } else {
              repeatPasssword?.showError(response.responseText);
            }
          }
        } catch (e) {
          throw new Error("Проблемы с редактированием профиля");
        }
      },
    },
  });
  return editProfileTemplate;
}
// { oldPass: "Qwerty12", newPass: "Qwerty34", repeat_newPass: "Qwerty34" }
