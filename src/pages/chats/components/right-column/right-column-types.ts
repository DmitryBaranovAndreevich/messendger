import { IBlock, TProps } from "../../../../modules";
import { Message } from "./components";

export type TRightColumnTemplate = {
  content: IBlock<Record<string, TProps>>;
  message?: Message;
};
