import { TCallBack } from "../../types";
import { IEventBus } from "./event-bus-types";

export class EventBus<T extends string | number | symbol>
  implements IEventBus<T>
{
  listeners: IEventBus<T>["listeners"] = {};
  constructor() {}

  on(event: T, callback: TCallBack) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: T, callback: TCallBack) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${String(event)}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event: T, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${String(event)}`);
    }

    this.listeners[event].forEach(function (listener) {
      listener(...args);
    });
  }
}
