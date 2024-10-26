import {
  validateUserEmail,
  validateUserLogin,
  validateUserName,
  validateUserPassword,
  validateUserPhone,
} from "../../utils";

export const registerParamsConfig = [
  {
    label: "Почта",
    value: "pochta@yandex.ru",
    disabled: true,
    name: "email",
    type: "text",
    errorMessage: "Некорректный email",
    validateFunc: validateUserEmail,
  },
  {
    label: "Логин",
    value: "ivanivanov",
    disabled: true,
    name: "login",
    type: "text",
    errorMessage: "Допустимы только буквы английского алфавита, цыфры, - и _",
    validateFunc: validateUserLogin,
  },
  {
    label: "Имя",
    value: "Иван",
    disabled: true,
    name: "first_name",
    type: "text",
    errorMessage:
      "Имя должно начинаться с заглавной буквы и содержать только буквы",
    validateFunc: validateUserName,
  },
  {
    label: "Фамилия",
    value: "Иванов",
    disabled: true,
    name: "second_name",
    type: "text",
    errorMessage:
      "Фамилия должно начинаться с заглавной буквы и содержать только буквы",
    validateFunc: validateUserName,
  },
  {
    label: "Телефон",
    value: "+7 (909) 967 30 30",
    disabled: true,
    name: "phone",
    type: "text",
    errorMessage: "Номер должен содержать от 10 до 15 цифр",
    validateFunc: validateUserPhone,
  },
  {
    label: "Пароль",
    value: "123456789",
    disabled: false,
    name: "password",
    type: "password",
    errorMessage:
      "Пароль должен быть от 8 до 50 символов и содержать заглавные буквы и цифры",
    validateFunc: validateUserPassword,
  },
  {
    label: "Пароль еще раз",
    value: "123456789",
    disabled: false,
    name: "repeat_password",
    type: "password",
    errorMessage:
      "Пароль должен быть от 8 до 50 символов и содержать заглавные буквы и цифры",
    validateFunc: validateUserPassword,
  },
];
