export type HistoryState<T> = {
  past: T[];
  present: T;
  future: T[];
};

export const MAX_HISTORY_LENGTH = 50;

export const createHistory = <T>(initial: T): HistoryState<T> => ({
  past: [],
  present: initial,
  future: [],
});

export const record = <T>(state: HistoryState<T>, snapshot: T) => {
  if (Object.is(state.present, snapshot)) {
    return state;
  }

  return {
    past: [...state.past, state.present].slice(-MAX_HISTORY_LENGTH),
    present: snapshot,
    future: [],
  };
};

export const undo = <T>(state: HistoryState<T>): HistoryState<T> => {
  const previous = state.past[state.past.length - 1];

  if (previous === undefined) {
    return state;
  }

  return {
    past: state.past.slice(0, -1),
    present: previous,
    future: [state.present, ...state.future],
  };
};

export const redo = <T>(state: HistoryState<T>): HistoryState<T> => {
  const next = state.future[0];

  if (next === undefined) {
    return state;
  }

  return {
    past: [...state.past, state.present],
    present: next,
    future: state.future.slice(1),
  };
};
