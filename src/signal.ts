import type { SignalSubscriber } from "./types";

let currentSubscriber: SignalSubscriber | undefined;
export function setCurrentSubscriber(fn: SignalSubscriber | undefined) {
  currentSubscriber = fn;
}

export function getCurrentSubscriber() {
  return currentSubscriber;
}

export function signal<V extends unknown>(initialValue?: V) {
  let subscriptions = new Set<SignalSubscriber>();
  let _value = initialValue;

  const addSubscriberFn = (subFn: SignalSubscriber) => {
    if (!subscriptions.has(subFn)) subscriptions.add(subFn);
  };

  return {
    get value() {
      if (currentSubscriber) addSubscriberFn(currentSubscriber);

      return _value as V;
    },
    set value(newValue) {
      _value = newValue;

      subscriptions.forEach((fn) => fn());
    },
  };
}
