import { describe, expect, it } from "vitest";

import { createRestoreGuard } from "./restoration";

describe("canvas restoration guard", () => {
  it("allows only one restoration at a time", () => {
    const guard = createRestoreGuard();

    expect(guard.start()).toBe(true);
    expect(guard.start()).toBe(false);

    guard.finish();
    expect(guard.start()).toBe(true);
  });
});
