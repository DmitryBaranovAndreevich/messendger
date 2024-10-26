import { addTemplate } from "../../utils";
import "./register.scss";

const root = document.querySelector<HTMLDivElement>("#root");
addTemplate("#entry-template", root);

const elements = document.querySelector<HTMLFormElement>(
  ".registerPage__formWrapper"
)?.elements;
if (elements) {
  const lastInputPassword = Array.from(elements).find(
    (el): el is HTMLInputElement => el.getAttribute("name") === "password-copy"
  );
  lastInputPassword?.setAttribute("value", "111111111");
  lastInputPassword?.classList.add(`${lastInputPassword.className}_isError`);
  const parent = lastInputPassword?.closest("div");
  const errorClass = `${parent?.className}__error`;
  const error = parent?.querySelector(`.${errorClass}`);
  error?.classList.add(`${errorClass}_visible`);
}
