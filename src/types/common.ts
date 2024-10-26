export type TCallBack = <S extends TProps<S>>(...args: S[]) => void;

export enum Etag {
  DIV = "div",
  BUTTON = "button",
  LABEL = "label",
  INPUT = "input",
  PARAGRAPH = "p",
  LINK = "a",
}

export type TProps<T> =  T extends unknown ? T : never