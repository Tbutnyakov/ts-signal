import { SignalSubscriber } from "./types";
import { setCurrentSubscriber } from "./signal";

export function effect(fn: SignalSubscriber) {
  if (typeof fn !== "function") return;

  setCurrentSubscriber(fn);

  fn();

  setCurrentSubscriber(undefined);
}
