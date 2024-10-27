import { changePassConfig } from "./profile-constants";
import { TEditPasswordTemplate } from "./profile-types";
import { Button, createImgPopup, creteParams, Params } from "./components";
import { Button as SubmitButton } from "../../components";
import { EditPasswordTemplate } from "./edit-password";
import styles from "./profile.module.scss";
import { CenterPageLayout } from "../../layouts";

export function createEditPasswordTemplate(goToProfile: () => void) {
  const params = changePassConfig.map((el) =>
    creteParams({
      errorMessage: el.errorMessage,
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
      [changePassConfig[index].name]: el.component,
    }),
    {} as Record<keyof TEditPasswordTemplate, Params>
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
      {} as Record<keyof TEditPasswordTemplate, Params>
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
    popup.hide()
  }

  const editProfileTemplate = new EditPasswordTemplate({
    ...htmlElements,
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
