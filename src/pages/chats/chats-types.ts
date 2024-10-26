import { IBlock, TProps } from "../../modules";

export type TChatsTemplate = {
  chatsColumn: IBlock<Record<string, TProps>>;
  contentColumn: IBlock<Record<string, TProps>>;
};
