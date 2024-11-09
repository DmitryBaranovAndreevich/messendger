import {
  validateUserEmail,
  validateUserLogin,
  validateUserName,
  validateUserPassword,
  validateUserPhone,
} from "../../utils";

export const userParamsConfig = [
  {
    label: "Почта",
    value: "pochta@yandex.ru",
    disabled: false,
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
    label: "Имя в чате",
    value: "Иван",
    disabled: true,
    name: "display_name",
    type: "text",
  },
  {
    label: "Телефон",
    value: "+79096730000",
    disabled: true,
    name: "phone",
    type: "text",
    errorMessage: "Номер должен содержать от 10 до 15 цифр",
    validateFunc: validateUserPhone,
  },
];

export const changePassConfig = [
  {
    label: "Старый пароль",
    value: "",
    disabled: false,
    name: "oldPass",
    type: "password",
    errorMessage:
      "Пароль должен быть от 8 до 50 символов и содержать заглавные буквы и цифры",
    validateFunc: validateUserPassword,
  },
  {
    label: "Новый пароль",
    value: "",
    disabled: false,
    name: "newPass",
    type: "password",
    errorMessage:
      "Пароль должен быть от 8 до 50 символов и содержать заглавные буквы и цифры",
    validateFunc: validateUserPassword,
  },
  {
    label: "Повторите новый пароль",
    value: "",
    disabled: false,
    name: "repeat_newPass",
    type: "password",
    errorMessage:
      "Пароль должен быть от 8 до 50 символов и содержать заглавные буквы и цифры",
    validateFunc: validateUserPassword,
  },
];
