import { Button, Label } from "../../../../components";
import { IBlock, TProps } from "../../../../modules";

export type TImgLoaderForm = {
  submitButton: Button;
  exitButton: Button;
  errorLabel: Label;
  fileLabel: Label;
};

export type TImgLoader = {
  content: IBlock<Record<string, TProps>>;
};

export type TImgName = {
  okButton: Button;
  fileName: string;
};
