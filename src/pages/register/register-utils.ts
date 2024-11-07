import { registerParamsConfig } from "./register-constants";
import { CenterPageLayout } from "../../layouts";
import { getInputWithItem } from "../../components";
import { TRegisterRequestParams, TRegisterTemplate } from "./register-types";
import { Button, InputWithItem } from "../../components";
import { RegisterTemplate } from "./register";
import { RegisterAPI } from "./register-api";
import styles from "./register.module.scss";
import { ERouterEvents, eventBusRouter, setCookie } from "../../utils";

const registerAPI = new RegisterAPI();

export function createRegister() {
  const inputs = registerParamsConfig.map((el) =>
    getInputWithItem({
      type: el.type,
      name: el.name,
      item: el.label,
      error: el.errorMessage,
      disabled: el.disabled,
      validateFunc: el.validateFunc,
    }),
  );

  const htmlElements = inputs.reduce(
    (acc, el) => ({
      ...acc,
      [el.name]: el.inputWithItem,
    }),
    {} as Record<keyof TRegisterTemplate, InputWithItem>,
  );

  const buttonSubmit = new Button({
    text: "Авторизоваться",
    type: "submit",
    className: styles.registerPage__submitButton,
  });

  const registerTemplate = new RegisterTemplate({
    ...htmlElements,
    buttonSubmit,
    events: {
      submit: async (e) => {
        e.preventDefault();
        inputs.forEach((input) => {
          input.validateInputValue();
        });
        const isError = inputs.find((el) => el.state.isError);
        if (isError) {
          return;
        }

        const password = inputs.find((el) => el.name === "password");
        const passwordRepeat = inputs.find(
          (el) => el.name === "repeat_password",
        );
        if (password?.state.value !== passwordRepeat?.state.value) {
          password?.setError(true, "Пароли не совпадают");
          passwordRepeat?.setError(true, "Пароли не совпадают");
          return;
        }

        const formValue = inputs.reduce(
          (acc, el) => ({ ...acc, [el.name]: el.state.value }),
          {} as TRegisterRequestParams & { repeat_password: string },
        );
        const { repeat_password, ...rest } = formValue;

        const response = await registerAPI.create(rest);
        if (response.status === 200) {
          setCookie("isLogin", "true", { expires: 1200 });
          eventBusRouter.emit(ERouterEvents.URL_CHANGE, "/messenger");
        }
      },
    },
  });

  const layout = new CenterPageLayout({
    className: "registerPage",
    content: registerTemplate,
  });

  return layout;
}
