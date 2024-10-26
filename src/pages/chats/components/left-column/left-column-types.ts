import { Link } from "../../../../components";
import { ChatsTitle, Input } from "./components";

export type TLeftColumnTemplate = {
  linkButton: Link;
  searchInput: Input;
  chatsList: ChatsTitle;
};

export type TChatsData = {
  id: string;
  title: string;
  url: string;
  comment: { text: string; owner: boolean; time: string }[];
  count: number;
  activeChat?: string;
};
