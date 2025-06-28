import { effect } from "./effect";
import { signal } from "./signal";

export function computed(fn: () => unknown) {
  const computed = signal();

  effect(() => {
    computed.value = fn();
  });

  return computed;
}
