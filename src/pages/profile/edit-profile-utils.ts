import { userParamsConfig } from "./profile-constants";
import { TProfileTemplate, TUserInfo } from "./profile-types";
import { Button, createImgPopup, creteParams, Params } from "./components";
import { EditProfileTemplate } from "./edit-profile";
import { Button as SubmitButton } from "../../components";
import { CenterPageLayout } from "../../layouts";
import styles from "./profile.module.scss";
import { ProfileAPI } from "./profile-api";
import defaultAvatarImg from "../../icons/imgLoader.svg";
import { BASE_URL } from "../../services";

const profileAPIInstance = new ProfileAPI();

export function createEditProfileTemplate(
  goToProfile: () => void,
  userData: TUserInfo,
) {
  const params = userParamsConfig.map((el) =>
    creteParams({
      errorMessage: el.errorMessage || "",
      type: el.type,
      disabled: "",
      name: el.name,
      label: el.label,
      value: userData[el.name as keyof TUserInfo],
      validateFunc: el.validateFunc,
    }),
  );

  const htmlElements = params.reduce(
    (acc, el, index) => ({
      ...acc,
      [userParamsConfig[index].name]: el.component,
    }),
    {} as Record<keyof TProfileTemplate, Params>,
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
        [userParamsConfig[index].name]: el.state.value,
      }),
      {} as Record<keyof TProfileTemplate, string>,
    );
  }

  const submitButton = new SubmitButton({
    type: "submit",
    text: "Сохранить",
  });

  const changeAvatarButton = new Button({
    content: `Поменять аватар`,
    className: styles.profile__changeAvatar,
    events: {
      click: openChangeAvatarPopup,
    },
  });

  const popup = new CenterPageLayout({
    className: styles.profile_dark,
    content: createImgPopup(goToEditProfileTemplate, changeAvatar),
  });

  popup.hide();

  function openChangeAvatarPopup() {
    popup.show("flex");
  }

  function goToEditProfileTemplate() {
    popup.hide();
  }

  const editProfileTemplate = new EditProfileTemplate({
    ...htmlElements,
    name: "Иван",
    submitButton,
    changeAvatarButton,
    avatarImg: userData.avatar
      ? `${BASE_URL}/resources${userData.avatar}`
      : defaultAvatarImg,
    popup,
    events: {
      submit: async (e) => {
        e.preventDefault();
        const isValid = validateForm();
        const phoneInput = params.find((el) => el.name === "phone");
        try {
          if (isValid) {
            const formValues = getFormValues();
            const response = await profileAPIInstance.editProfile(formValues);
            if (response.status === 200) {
              goToProfile();
            } else {
              phoneInput?.showError(response.responseText);
            }
          }
        } catch (e) {
          phoneInput?.showError("Проблемы с редактированием профиля");
        }
      },
    },
  });

  function changeAvatar(url: string) {
    editProfileTemplate.setProps({ avatarImg: `${BASE_URL}/resources/${url}` });
  }

  return editProfileTemplate;
}
