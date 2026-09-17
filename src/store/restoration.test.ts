import { describe, expect, it } from "vitest";

import { createRestoreGuard } from "./restoration";

describe("canvas restoration guard", () => {
  it("allows only one restoration at a time", () => {
    const guard = createRestoreGuard();
    const token = guard.start();

    expect(token).toBeTypeOf("number");
    expect(guard.start()).toBeNull();

    guard.finish(token);
    expect(guard.start()).toBeTypeOf("number");
  });

  it("does not let an invalidated restoration finish a newer one", () => {
    const guard = createRestoreGuard();
    const oldToken = guard.start();

    guard.invalidate();
    const newToken = guard.start();

    guard.finish(oldToken);

    expect(newToken).not.toBe(oldToken);
    expect(guard.start()).toBeNull();
  });
});
