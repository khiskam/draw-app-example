import { HistoryState } from "./history";

export type CanvasState = {
  fabric: fabric.Canvas;
  history: HistoryState<string>;
};
