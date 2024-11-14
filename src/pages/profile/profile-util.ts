import { CenterPageLayout } from "../../layouts";
import { userParamsConfig } from "./profile-constants";
import { ProfileTemplate } from "./profile";
import { TProfileTemplate, TUserInfo } from "./profile-types";
import { Button, creteParams, createImgPopup, Params } from "./components";
import styles from "./profile.module.scss";
import { createEditProfileTemplate } from "./edit-profile-utils";
import { createEditPasswordTemplate } from "./edit-password-utils";
import { eraseCookie, ERouterEvents, eventBusRouter } from "../../utils";
import { ProfileAPI } from "./profile-api";
import defaultAvatarImg from "../../icons/imgLoader.svg";
import { BASE_URL } from "../../services";

const profileAPIInstance = new ProfileAPI();

const goToLogin = () => {
  eraseCookie("login");
  const url = new URL(`${window.location.origin}`);
  eventBusRouter.emit(ERouterEvents.URL_CHANGE, url.pathname);
};

export async function createProfile() {
  try {
    const fetchUserData = async () => {
      try {
        return await profileAPIInstance.request();
      } catch (e) {
        goToLogin();
        console.log("Проблемы с загрузкой данных о пользователе");
      }
    };
    const userData = await fetchUserData();
    function createProfileTemplate(userData: TUserInfo) {
      const params = userParamsConfig.map((el) =>
        creteParams({
          errorMessage: "",
          type: el.type,
          disabled: `disabled="true"`,
          name: el.name,
          label: el.label,
          value: userData[el.name as keyof TUserInfo],
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
          click: async () => {
            try {
              const isExit = await profileAPIInstance.delete();
              if (isExit.status === 200) {
                eraseCookie("login");
                const url = new URL(`${window.location.origin}/messenger`);
                eventBusRouter.emit(ERouterEvents.URL_CHANGE, url.pathname);
              }
            } catch (e) {
              goToLogin();
              console.log("Не удалось  покинуть профиль");
            }
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
        content: createImgPopup(goToProfile, changeAvatar),
      });

      popup.hide();

      const profileTemplate = new ProfileTemplate({
        ...htmlElements,
        avatarImg: userData.avatar
          ? `${BASE_URL}/resources${userData.avatar}`
          : defaultAvatarImg,
        name: userData.first_name,
        editProfileButton,
        changePassButton,
        exitButton,
        changeAvatarButton,
        popup,
      });

      function openChangeAvatarPopup() {
        popup.show("flex");
      }

      function changeAvatar(url: string) {
        profileTemplate.setProps({ avatarImg: `${BASE_URL}/resources/${url}` });
      }

      return profileTemplate;
    }

    if (!userData || userData?.status !== 200) {
      goToLogin();
      return;
    }

    const userConfig = JSON.parse(userData.responseText);
    const layout = new CenterPageLayout({
      content: createProfileTemplate(userConfig),
    });

    function onEditProfileClick() {
      layout.setProps({
        content: createEditProfileTemplate(goToProfile, userConfig),
      });
    }

    function onEditPasswordClick() {
      layout.setProps({
        content: createEditPasswordTemplate(goToProfile, userConfig),
      });
    }

    function goToProfile() {
      eventBusRouter.emit(ERouterEvents.URL_CHANGE, "/settings", false);
    }

    return layout;
  } catch (e) {
    eventBusRouter.emit(ERouterEvents.URL_CHANGE, "/400");
    console.log("Не удалось загрузить профиль");
  }
}
