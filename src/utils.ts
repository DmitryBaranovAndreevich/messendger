import Handlebars from "handlebars";

export function addTemplate(
  templateSelector: string,
  root: HTMLElement | null,
  params = {}
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
