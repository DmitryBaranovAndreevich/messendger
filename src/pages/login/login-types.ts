import { Button, InputWithItem, Link } from "../../components";

export type TLoginTemplate = {
  login: InputWithItem;
  password: InputWithItem;
  buttonSubmit: Button;
  link: Link;
};

export type TLoginUserRequest = {
  login: "string";
  password: "string";
};
