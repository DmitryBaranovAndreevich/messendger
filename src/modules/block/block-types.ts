import { EEvents } from "../../types";
import { IEventBus } from "../event-bus";

export interface IBlock<T> {
  _element: HTMLElement | null;
  _meta: { tagName: string; props: T };
  props: T;
  eventBus: () => IEventBus<EEvents>;
  render: () => string | void;
}
export type TPropsObj<T> = {
  events?: Record<string, (e: Event) => void>;
} & T;
export type TProps =
  | string
  | number
  | string[]
  | number
  | boolean
  | Record<string, (e: Event) => void>
  | Record<string, unknown>
  | Record<string, unknown>[]
  | IBlock<Record<string, TProps>>
  | null;
