import { Link } from "../../../../components";
import { CenterPageLayout } from "../../../../layouts";
import { ChatsTitle, Input } from "./components";

export type TLeftColumnTemplate = {
  linkButton: Link;
  newChatButton: Link;
  searchInput: Input;
  chatsList: ChatsTitle;
  createChatPopup: CenterPageLayout;
  addUserPopup: CenterPageLayout;
  removeUserPopup?: CenterPageLayout;
};

export type TChatsData = {
  id: string;
  title: string;
  url: string;
  comment: { text: string; owner: boolean; time: string }[];
  count: number;
  activeChat?: string;
};
