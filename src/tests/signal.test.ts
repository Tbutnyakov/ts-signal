import { signal } from "../signal";

import { expect, test } from "vitest";

test("signal is exist ", () => {
  expect(signal).toBeTypeOf("function");
});
