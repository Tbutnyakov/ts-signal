import { signal } from "../";

import { expect, test } from "vitest";

test("signal is exist ", () => {
  expect(signal).toBeTypeOf("function");
});

test("returns passed value ", () => {
  const initVal = "test";
  const newSignal = signal(initVal);

  expect(newSignal.value).toBe(initVal);
});

test("supports value rewriting", () => {
  const initVal = "test";
  const newValue = "test2";
  const newSignal = signal(initVal);
  newSignal.value = newValue;

  expect(newSignal.value).toBe(newValue);
});
