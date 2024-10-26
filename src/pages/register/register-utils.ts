import { registerParamsConfig } from "./register-constants";
import { CenterPageLayout } from "../../layouts";
import { getInputWithItem } from "../../components";
import { TRegisterTemplate } from "./register-types";
import { Button, InputWithItem } from "../../components";
import { RegisterTemplate } from "./register";
import styles from "./register.module.scss";

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
      submit: (e) => {
        e.preventDefault();
        inputs.forEach((input) => {
          input.validateInputValue();
        });
        const isError = inputs.find((el) => el.state.isError);
        if (isError) {
          return;
        }

        const formValue = inputs.reduce(
          (acc, el) => ({ ...acc, [el.name]: el.state.value }),
          {},
        );
        console.log(formValue);
      },
    },
  });

  const layout = new CenterPageLayout({
    className: "registerPage",
    content: registerTemplate,
  });

  return layout;
}
