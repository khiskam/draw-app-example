import { fabric } from "fabric";
import { create } from "zustand";

import { CanvasState } from "./types";

export const useCanvas = create<CanvasState>(() => ({
  fabric: new fabric.Canvas(null),
}));
