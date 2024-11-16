import { Button, InputWithItem } from "../../../../../../components";
import { UsersListTemplate } from "./components";

export type TAddUserPopupTemplate = {
  input: InputWithItem;
  button: Button;
  exitButton: Button;
  usersList: UsersListTemplate;
};
