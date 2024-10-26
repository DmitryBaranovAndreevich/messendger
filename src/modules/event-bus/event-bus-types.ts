import { TCallBack, TProps } from "../../types";

export interface IEventBus<T extends string | number | symbol> {
  listeners: Partial<Record<T, TCallBack[]>>;
  on: (event: T, callback: TCallBack) => void;
  off: (event: T, callback: TCallBack) => void;
  emit: <S extends TProps<S>>(event: T, ...args: S[]) => void;
}
