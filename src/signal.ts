import type { SignalSubscriber } from "./types";

let currentSubscriber: SignalSubscriber | undefined;
export function setCurrentSubscriber(fn: SignalSubscriber | undefined) {
  currentSubscriber = fn;
}

export function getCurrentSubscriber() {
  return currentSubscriber;
}

export function signal<V extends unknown>(initialValue: V) {
  let subscriptions = new Set<SignalSubscriber>();
  let _value = initialValue;

  return {
    get value() {
      if (currentSubscriber) {
        subscriptions.add(currentSubscriber);
      }

      return _value;
    },
    set value(newValue) {
      _value = newValue;

      subscriptions.forEach((fn) => fn());
    },
  };
}
