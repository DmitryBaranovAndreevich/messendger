import Handlebars from "handlebars";
import { EventBus } from "./modules";

export function addTemplate(
  templateSelector: string,
  root: HTMLElement | null,
  params = {},
) {
  if (!root) {
    return;
  }

  const source =
    document.querySelector<HTMLScriptElement>(templateSelector)!.innerHTML;
  const template = Handlebars.compile(source)(params);

  root.innerHTML = template;
}

export function validateUserName(name: string) {
  return !/^[A-ZА-ЯЁ][a-zа-яё-]*$/.test(name);
}

export function validateUserLogin(name: string) {
  if (name.length < 3 || name.length > 20) {
    return true;
  }
  const isLetter = /[A-Za-z]+/.test(name);
  return !(isLetter && /^[A-Za-z0-9-_]*$/.test(name));
}

export function validateUserEmail(email: string) {
  return !/^[^\s]+@[A-Za-z]+\.[A-Za-z]+$/.test(email);
}

export function validateUserPassword(password: string) {
  if (password.length < 8 || password.length > 40) {
    return true;
  }
  const isLetter = /[A-ZА-ЯЁ]+/.test(password);
  const isNumber = /[0-9]+/.test(password);
  return !(isLetter && isNumber);
}

export function validateUserPhone(phone: string) {
  if (phone.length < 10 || phone.length > 15) {
    return true;
  }

  return !/^[+0-9]{1}[0-9]+$/.test(phone);
}

export const eventBusRouter = new EventBus<ERouterEvents>();

export enum ERouterEvents {
  URL_CHANGE = "url_change",
}

type TProps = {
  [name: string]: boolean | string | Date | number;
};

export function setCookie(name: string, value: string, props: TProps) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && (exp as Date).toUTCString) {
    props.expires = (exp as Date).toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}


export function eraseCookie(name: string) {
  document.cookie = name + "=; Max-Age=-99999999;";
}

export const test = () => {}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)",
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
