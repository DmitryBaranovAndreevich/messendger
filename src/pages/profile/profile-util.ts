import { CenterPageLayout } from "../../layouts";
import { userParamsConfig } from "./profile-constants";
import { ProfileTemplate } from "./profile";
import { TProfileTemplate } from "./profile-types";
import { Button, creteParams, createImgPopup, Params } from "./components";
import styles from "./profile.module.scss";
import { createEditProfileTemplate } from "./edit-profile-utils";
import { createEditPasswordTemplate } from "./edit-password-utils";
import { ERouterEvents, eventBusRouter } from "../utils";

export function createProfile() {
  function createProfileTemplate() {
    const params = userParamsConfig.map((el) =>
      creteParams({
        errorMessage: "",
        type: el.type,
        disabled: `disabled="true"`,
        name: el.name,
        label: el.label,
        value: el.value,
      }),
    );

    const htmlElements = params.reduce(
      (acc, el, index) => ({
        ...acc,
        [userParamsConfig[index].name]: el.component,
      }),
      {} as Record<keyof TProfileTemplate, Params>,
    );

    const editProfileButton = new Button({
      content: "Изменить данные",
      events: {
        click: onEditProfileClick,
      },
    });

    const changePassButton = new Button({
      content: "Изменить пароль",
      events: {
        click: onEditPasswordClick,
      },
    });

    const exitButton = new Button({
      content: "Выйти",
      className: styles.profile__exit,
      events: {
        click: () => {
          const url = new URL(`${window.location.origin}/messenger`);
          eventBusRouter.emit(ERouterEvents.URL_CHANGE, url.pathname);
        },
      },
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
      content: createImgPopup(goToProfile),
    });

    popup.hide();

    const profileTemplate = new ProfileTemplate({
      ...htmlElements,
      name: "Иван",
      editProfileButton,
      changePassButton,
      exitButton,
      changeAvatarButton,
      popup,
    });

    function openChangeAvatarPopup() {
      popup.show("flex");
    }

    return profileTemplate;
  }

  const layout = new CenterPageLayout({
    content: createProfileTemplate(),
  });

  function onEditProfileClick() {
    layout.setProps({
      content: createEditProfileTemplate(goToProfile),
    });
  }

  function onEditPasswordClick() {
    layout.setProps({
      content: createEditPasswordTemplate(goToProfile),
    });
  }

  function goToProfile() {
    layout.setProps({
      content: createProfileTemplate(),
    });
  }

  return layout;
}
