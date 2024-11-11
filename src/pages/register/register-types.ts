import { Button, InputWithItem } from "../../components";

export type TRegisterTemplate = {
  phone: InputWithItem;
  display_name: InputWithItem;
  second_name: InputWithItem;
  first_name: InputWithItem;
  login: InputWithItem;
  email: InputWithItem;
  buttonSubmit: Button;
};

export type TRegisterRequestParams = {
  phone: string;
  display_name: string;
  second_name: string;
  first_name: string;
  login: string;
  email: string;
};