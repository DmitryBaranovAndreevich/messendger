import { userParamsConfig } from "./profile-constants";
import { TProfileTemplate } from "./profile-types";
import { Button, createImgPopup, creteParams, Params } from "./components";
import { EditProfileTemplate } from "./edit-profile";
import { Button as SubmitButton } from "../../components";
import { CenterPageLayout } from "../../layouts";
import styles from "./profile.module.scss";

export function createEditProfileTemplate(goToProfile: () => void) {
  const params = userParamsConfig.map((el) =>
    creteParams({
      errorMessage: el.errorMessage || "",
      type: el.type,
      disabled: "",
      name: el.name,
      label: el.label,
      value: el.value,
      validateFunc: el.validateFunc,
    })
  );

  const htmlElements = params.reduce(
    (acc, el, index) => ({
      ...acc,
      [userParamsConfig[index].name]: el.component,
    }),
    {} as Record<keyof TProfileTemplate, Params>
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
      {} as Record<keyof TProfileTemplate, Params>
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
    content: createImgPopup(goToEditProfileTemplate),
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
    popup,
    events: {
      submit: (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
          const values = getFormValues();
          console.log(values);
          goToProfile();
        }
      },
    },
  });
  return editProfileTemplate;
}
