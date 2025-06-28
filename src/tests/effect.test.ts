import { effect, signal } from "../";

import { expect, test, vi } from "vitest";

test("effect is exist ", () => {
  expect(effect).toBeTypeOf("function");
});

test("call passed callback", () => {
  const spyFn = vi.fn();

  effect(() => spyFn());

  expect(spyFn).toBeCalledTimes(1);
});

test("call passed callback if effect is called and effect contains signal", () => {
  const targetSignal = signal(0);

  const spyFn = vi.fn();

  effect(() => {
    console.log(targetSignal.value * 10);
    spyFn();
  });

  targetSignal.value += 1;
  targetSignal.value += 1;

  expect(spyFn).toBeCalledTimes(3);
});

test("calls passed callback only once since no signal used", () => {
  const targetSignal = signal(0);

  const spyFn = vi.fn();

  effect(() => {
    spyFn();
  });

  targetSignal.value += 1;
  targetSignal.value += 1;

  expect(spyFn).toBeCalledTimes(1);
});
