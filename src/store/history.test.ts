import { describe, expect, it } from "vitest";

import {
  createHistory,
  MAX_HISTORY_LENGTH,
  record,
  redo,
  undo,
} from "./history";

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

  it("evicts the oldest snapshots after reaching the history limit", () => {
    let state = createHistory("snapshot-0");

    for (let index = 1; index <= MAX_HISTORY_LENGTH + 1; index += 1) {
      state = record(state, `snapshot-${index}`);
    }

    expect(state.past).toHaveLength(MAX_HISTORY_LENGTH);
    expect(state.past[0]).toBe("snapshot-1");
    expect(undo(state).present).toBe("snapshot-" + MAX_HISTORY_LENGTH);
  });
});
