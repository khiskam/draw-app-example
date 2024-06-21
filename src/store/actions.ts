import { fabric } from "fabric";

import { BrushWidth, Colors } from "@/constants";
import { BrushWidthSizes, Dimensions, Mode } from "@/types";

import { useCanvas } from "./useCanvas";

export const init = (canvas: HTMLCanvasElement) => {
  useCanvas.setState(() => {
    const fabricCanvas = new fabric.Canvas(canvas);
    fabricCanvas.isDrawingMode = true;
    fabricCanvas.freeDrawingBrush.color = Colors.Blue;
    fabricCanvas.freeDrawingBrush.width = BrushWidth.Minimum;

    fabricCanvas.on("object:added", handleChange);
    fabricCanvas.on("object:removed", handleChange);

    return { fabric: fabricCanvas };
  });
};

export const handleChange = () => {
  useCanvas.setState(({ fabric }) => ({ fabric }));
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
    if (fabric.isDrawingMode) {
      fabric.clear();
    } else {
      fabric.selection = false;
      fabric.remove(...fabric.getActiveObjects());
      fabric.selection = true;
    }

    return { fabric };
  });
};

export const destroy = () => {
  useCanvas.setState(({ fabric }) => {
    fabric.dispose();

    return { fabric };
  });
};
