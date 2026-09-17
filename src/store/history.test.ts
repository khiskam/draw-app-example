import { describe, expect, it } from "vitest";

import { createHistory, record, redo, undo } from "./history";

describe("canvas history", () => {
  it("cannot undo the initial snapshot", () => {
    const state = createHistory("empty");

    expect(undo(state)).toEqual(state);
  });

  it("undoes and redoes recorded snapshots", () => {
    const state = record(record(createHistory("empty"), "one"), "two");

    const undone = undo(state);
    expect(undone.present).toBe("one");
    expect(redo(undone).present).toBe("two");
  });

  it("clears redo snapshots when a new change is recorded", () => {
    const state = undo(record(record(createHistory("empty"), "one"), "two"));
    const branched = record(state, "new branch");

    expect(branched.future).toEqual([]);
    expect(redo(branched)).toEqual(branched);
  });

  it("does not record an unchanged snapshot", () => {
    const state = createHistory("empty");

    expect(record(state, "empty")).toBe(state);
  });
});
