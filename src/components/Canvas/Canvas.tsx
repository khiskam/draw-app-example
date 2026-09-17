import { useEffect, useRef } from "react";

import PenIcon from "@/assets/pen.svg?react";
import RedoIcon from "@/assets/redo.svg?react";
import SelectIcon from "@/assets/selection.svg?react";
import TrashIcon from "@/assets/trash.svg?react";
import UndoIcon from "@/assets/undo.svg?react";
import { BrushWidth } from "@/constants";
import { Actions, useCanvas } from "@/store";
import { BrushWidthSizes } from "@/types";

import { Brush } from "../Brush";
import { Fabric } from "../Fabric";
import { Tool } from "../Tool";
import { Toolbar } from "../Toolbar";
import styles from "./Canvas.module.scss";
import { DownloadTool } from "./DowloadTool";
import { useInit } from "./hooks";

export const Canvas = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { canvasRef } = useInit();
  const { fabric, history, isRestoring } = useCanvas();

  const isDrawing = fabric.isDrawingMode;

  const checkBrushWidth = (width: BrushWidthSizes) =>
    fabric.freeDrawingBrush.width === width && isDrawing;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "z") {
        return;
      }

      if (useCanvas.getState().isRestoring) {
        return;
      }

      event.preventDefault();
      if (event.shiftKey) {
        Actions.redoCanvas();
      } else {
        Actions.undoCanvas();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div ref={wrapperRef} className={styles.container}>
      <Fabric
        parentRef={wrapperRef}
        ref={canvasRef}
        onResize={Actions.setDimensions}
      />

      <Toolbar>
        <Tool
          icon={<UndoIcon />}
          disabled={isRestoring || history.past.length === 0}
          onClick={Actions.undoCanvas}
          title="Отменить (Ctrl/Cmd+Z)"
        />
        <Tool
          icon={<RedoIcon />}
          disabled={isRestoring || history.future.length === 0}
          onClick={Actions.redoCanvas}
          title="Повторить (Ctrl/Cmd+Shift+Z)"
        />
        <Tool icon={<TrashIcon />} onClick={Actions.clean} title={"Удалить"} />
        <Tool
          icon={<SelectIcon />}
          onClick={() => Actions.setMode("selection")}
          active={!isDrawing}
          title="Выделить"
        />
        <Tool
          icon={<PenIcon />}
          onClick={() => Actions.setMode("drawing")}
          active={isDrawing}
          title="Рисовать"
        />
        <Tool
          icon={<Brush type="Minimum" />}
          onClick={() => Actions.setBrushWidth(BrushWidth.Minimum)}
          active={checkBrushWidth(BrushWidth.Minimum)}
          title="Размер кисти 12"
        />
        <Tool
          icon={<Brush type="Medium" />}
          onClick={() => Actions.setBrushWidth(BrushWidth.Medium)}
          active={checkBrushWidth(BrushWidth.Medium)}
          title="Размер кисти 16"
        />
        <Tool
          icon={<Brush type="Maximum" />}
          onClick={() => Actions.setBrushWidth(BrushWidth.Maximum)}
          active={checkBrushWidth(BrushWidth.Maximum)}
          title="Размер кисти 20"
        />
        <DownloadTool />
      </Toolbar>
    </div>
  );
};
