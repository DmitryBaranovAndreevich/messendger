import { addTemplate } from "../../utils";
import { changePassConfig, userParamsConfig } from "./profile-constants";
import Handlebars from "handlebars";
import img from "../../icons/imgLoader.svg";

const root = document.querySelector<HTMLDivElement>("#root");

export function addMainProfileTemplate() {
  addTemplate("#entry-template", root);

  const paramsContainer = document.querySelector<HTMLUListElement>(
    ".profilePage__userParamsContainer"
  );

  addTemplate("#user-params-template", paramsContainer, {
    userParams: userParamsConfig,
  });

  addImg(".upload-container", img);

  const openPopupLoadbutton = document.querySelector<HTMLButtonElement>(
    ".upload-container__changeAvatarButton"
  );
  const changeProfileButton = document.querySelector<HTMLButtonElement>(
    ".profilePage__editProfile"
  );
  const changePassButton = document.querySelector<HTMLButtonElement>(
    ".profilePage__editPassword"
  );
  changeProfileButton?.addEventListener("click", addEditProfileTemplate);
  changePassButton?.addEventListener("click", addChangePassTemplate);
  openPopupLoadbutton?.addEventListener("click", openPopupLoadAvatar);
}

function openPopupLoadAvatar() {
  const source = document.querySelector<HTMLScriptElement>(
    "#img-popup-loader-template"
  )!.innerHTML;
  const template = Handlebars.compile(source)({});

  document.body.innerHTML += template;
}

function addEditProfileTemplate(e: MouseEvent) {
  const button = e.target as HTMLButtonElement;
  button?.removeEventListener("click", addEditProfileTemplate);
  addTemplate("#edit-profile-template", root);
  const paramsContainer = document.querySelector<HTMLUListElement>(
    ".profilePage__userParamsContainer"
  );
  addTemplate("#user-params-template", paramsContainer, {
    userParams: userParamsConfig.map((el) => ({ ...el, disabled: false })),
  });

  addImg(".upload-container", img);
  const openPopupLoadbutton = document.querySelector<HTMLButtonElement>(
    ".upload-container__changeAvatarButton"
  );

  openPopupLoadbutton?.addEventListener("click", openPopupLoadAvatar);
}

function addChangePassTemplate(e: MouseEvent) {
  const button = e.target as HTMLButtonElement;
  button?.removeEventListener("click", addChangePassTemplate);
  addTemplate("#edit-pass-template", root);
  const paramsContainer = document.querySelector<HTMLUListElement>(
    ".profilePage__userParamsContainer"
  );
  addTemplate("#user-params-template", paramsContainer, {
    userParams: changePassConfig,
  });

  addImg(".upload-container", img);

  const openPopupLoadbutton = document.querySelector<HTMLButtonElement>(
    ".upload-container__changeAvatarButton"
  );

  openPopupLoadbutton?.addEventListener("click", openPopupLoadAvatar);
}

function addImg(parentSelector: string, src: string) {
  const img = document.createElement("img");
  img.className = "upload-container__img";
  img.src = src;
  const parent = document.querySelector(parentSelector);
  parent?.appendChild(img);
}
