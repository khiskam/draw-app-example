import { fabric } from "fabric";

import { BrushWidth, Colors } from "@/constants";
import { BrushWidthSizes, Dimensions, Mode } from "@/types";

import { createHistory, record, redo, undo } from "./history";
import { createRestoreGuard } from "./restoration";
import { useCanvas } from "./useCanvas";

const restoreGuard = createRestoreGuard();
let suppressChanges = false;

const getSnapshot = (canvas: fabric.Canvas) => JSON.stringify(canvas.toJSON());

export const init = (canvas: HTMLCanvasElement) => {
  restoreGuard.finish();
  suppressChanges = false;

  useCanvas.setState(() => {
    const fabricCanvas = new fabric.Canvas(canvas);
    fabricCanvas.isDrawingMode = true;
    fabricCanvas.freeDrawingBrush.color = Colors.Blue;
    fabricCanvas.freeDrawingBrush.width = BrushWidth.Minimum;

    fabricCanvas.on("object:added", handleChange);
    fabricCanvas.on("object:removed", handleChange);
    fabricCanvas.on("object:modified", handleChange);

    return {
      fabric: fabricCanvas,
      history: createHistory(getSnapshot(fabricCanvas)),
      isRestoring: false,
    };
  });
};

export const handleChange = () => {
  if (suppressChanges || useCanvas.getState().isRestoring) {
    return;
  }

  useCanvas.setState(({ fabric, history }) => ({
    fabric,
    history: record(history, getSnapshot(fabric)),
  }));
};

export const setBrushWidth = (width: BrushWidthSizes) => {
  useCanvas.setState(({ fabric }) => {
    fabric.freeDrawingBrush.width = width;
    setMode("drawing");

    return { fabric };
  });
};

export const setMode = (mode: Mode) => {
  useCanvas.setState(({ fabric }) => {
    fabric.isDrawingMode = mode === "drawing";

    return { fabric };
  });
};

export const setDimensions = (dimensions: Dimensions) => {
  useCanvas.setState(({ fabric }) => {
    fabric.setDimensions(dimensions);

    return { fabric };
  });
};

export const clean = () => {
  useCanvas.setState(({ fabric }) => {
    suppressChanges = true;

    if (fabric.isDrawingMode) {
      fabric.clear();
    } else {
      fabric.selection = false;
      fabric.remove(...fabric.getActiveObjects());
      fabric.selection = true;
    }

    suppressChanges = false;

    return {
      fabric,
      history: record(useCanvas.getState().history, getSnapshot(fabric)),
    };
  });
};

const applySnapshot = (snapshot: string) => {
  const { fabric } = useCanvas.getState();

  if (!restoreGuard.start()) {
    return;
  }

  useCanvas.setState({ isRestoring: true });
  fabric.loadFromJSON(snapshot, () => {
    fabric.renderAll();
    restoreGuard.finish();
    useCanvas.setState({ isRestoring: false });
  });
};

export const undoCanvas = () => {
  const { history, isRestoring } = useCanvas.getState();

  if (isRestoring) {
    return;
  }

  const nextHistory = undo(history);

  if (nextHistory !== history) {
    useCanvas.setState({ history: nextHistory });
    applySnapshot(nextHistory.present);
  }
};

export const redoCanvas = () => {
  const { history, isRestoring } = useCanvas.getState();

  if (isRestoring) {
    return;
  }

  const nextHistory = redo(history);

  if (nextHistory !== history) {
    useCanvas.setState({ history: nextHistory });
    applySnapshot(nextHistory.present);
  }
};

export const destroy = () => {
  restoreGuard.finish();
  suppressChanges = false;

  useCanvas.setState(({ fabric }) => {
    fabric.dispose();

    return { fabric, history: createHistory(""), isRestoring: false };
  });
};
