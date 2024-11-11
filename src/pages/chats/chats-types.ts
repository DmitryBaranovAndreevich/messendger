import { IBlock, TProps } from "../../modules";

export type TChatsTemplate = {
  chatsColumn: IBlock<Record<string, TProps>>;
  contentColumn: IBlock<Record<string, TProps>>;
};

export type TUser = {
  first_name: string;
  second_name: string;
  avatar: string;
  email: string;
  login: string;
  phone: string;
  id: string;
};

export type TChats = {
  id: string;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  activeChat?: string;
  last_message?: {
    user: TUser;
    time: string;
    content: string;
  };
};
