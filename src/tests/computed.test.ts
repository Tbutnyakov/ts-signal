import { computed, signal } from "..";

import { expect, test, vi } from "vitest";

test("computed is exist ", () => {
  expect(computed).toBeTypeOf("function");
});

test("returns result of passed function", () => {
  const result = computed(() => true);

  expect(result.value).toBe(true);
});

test("returns result of passed function with signal in it", () => {
  const testSignal = signal(0);

  const result = computed(() => testSignal.value + +1);

  expect(result.value).toBe(1);
});

test("runs only once if no changes happens", () => {
  const spy = vi.fn();
  const testSignal = signal(0);

  const result = computed(() => {
    spy();
    return testSignal.value + +1;
  });

  expect(spy).toBeCalledTimes(1);
  expect(result.value).toBe(1);
});

test("recomputes on each signal value change", () => {
  const testSignal = signal(0);
  const spy = vi.fn();

  const result = computed(() => {
    spy();
    return testSignal.value + +1;
  });

  testSignal.value += 10;
  testSignal.value += 20;

  expect(spy).toBeCalledTimes(3);
  expect(result.value).toBe(31);
});
