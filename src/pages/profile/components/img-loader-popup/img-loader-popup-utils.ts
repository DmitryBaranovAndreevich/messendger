import { Button, Label } from "../../../../components";
import { ImgLoadForm } from "./img-loader-load-form";
import { ImgLoader } from "./img-loader-popup";
import { ImgName } from "./img-name";
import styles from "./img-loader-popup.module.scss";
import { ProfileAPI } from "../../profile-api";
import { TUserInfo } from "../../profile-types";

const profileAPIInstance = new ProfileAPI();

function createImgLoaderForm(goToProfile: () => void) {
  const submitButton = new Button({
    text: "Сохранить",
    type: "submit",
  });

  const exitButton = new Button({
    text: "Выйти",
    type: "buttton",
    className: styles.exitButton,
    events: {
      click: goToProfile,
    },
  });

  const errorLabel = new Label({
    content: "Необходимо выбрать файл",
    className: styles.imgLoader__error,
  });

  const fileLabel = new Label({
    content: "",
    className: styles.imgLoader__fileLabel,
  });

  errorLabel.hide();
  fileLabel.hide();

  return {
    fileLabel,
    errorLabel,
    imgLoadForm: new ImgLoadForm({
      submitButton,
      exitButton,
      errorLabel,
      fileLabel,
    }),
  };
}

function createImgName(fileName: string, onClick: (e: Event) => void) {
  const okButton = new Button({
    text: "Поменять",
    type: "button",
    events: {
      click: onClick,
    },
  });

  const imgName = new ImgName({
    fileName,
    okButton,
  });

  return imgName;
}

export const createImgPopup = (
  goToProfile: () => void,
  changeAvatar: (url: string) => void,
) => {
  const state: { logo?: FileList } = {
    logo: undefined,
  };

  const { errorLabel, fileLabel, imgLoadForm } =
    createImgLoaderForm(goToProfile);
  const loader = new ImgLoader({
    content: imgLoadForm,
    events: {
      change: handleChangeInput,
      submit: handleSubmitFormInput,
    },
  });

  function handleChangeInput(e: Event) {
    errorLabel.hide();
    const input = e.target as HTMLInputElement;
    const files = input.files;
    if (files && files.length > 0) {
      fileLabel.show();
      fileLabel.setProps({
        content: files[0].name,
      });
      state.logo = files;
    }
  }

  async function handleSubmitFormInput(e: Event) {
    try {
      e.preventDefault();
      e.stopPropagation();
      const form = e.target as HTMLFormElement;
      const input = form.elements[0] as HTMLInputElement;
      const files = input.files;
      if (files && files.length > 0) {
        if (state.logo) {
          const imgForm = new FormData(form);
          const response = await profileAPIInstance.editAvatar(imgForm);
          if (response?.status === 200) {
            const user: TUserInfo = JSON.parse(response.responseText);
            changeAvatar(user.avatar);
            loader.setProps({
              content: createImgName(files[0].name, handleOkButtonClick),
            });
          } else {
            errorLabel.setProps({ content: response.responseText });
            errorLabel.show();
          }
        }
      } else {
        errorLabel.setProps({ content: "Загрузите фото" });
        errorLabel.show();
      }
    } catch (e) {
      errorLabel.setProps({ content: "Проблемы с загрузкой фото" });
      errorLabel.show();
    }
  }

  function handleOkButtonClick() {
    loader.setProps({ content: createImgPopup(goToProfile, changeAvatar) });
  }

  return loader;
};
