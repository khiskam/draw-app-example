import { useRef } from "react";

import PenIcon from "@/assets/pen.svg?react";
import SelectIcon from "@/assets/selection.svg?react";
import TrashIcon from "@/assets/trash.svg?react";
import UploadIcon from "@/assets/upload.svg?react";
import { BrushWidth } from "@/constants";
import { Actions, useCanvas } from "@/store";
import { BrushWidthSizes } from "@/types";

import { Brush } from "../Brush";
import { Fabric } from "../Fabric";
import { Tool } from "../Tool";
import { Toolbar } from "../Toolbar";
import styles from "./Canvas.module.scss";
import { useInit } from "./hooks";

export const Canvas = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { canvasRef } = useInit();
  const { fabric } = useCanvas();

  const isDrawing = fabric.isDrawingMode;

  const checkBrushWidth = (width: BrushWidthSizes) =>
    fabric.freeDrawingBrush.width === width && isDrawing;

  return (
    <div ref={wrapperRef} className={styles.container}>
      <Fabric parentRef={wrapperRef} ref={canvasRef} onResize={Actions.setDimensions} />

      <Toolbar>
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
        <Tool
          icon={<UploadIcon />}
          disabled={fabric.isEmpty()}
          title={"Определить букву"}
          type="submit"
        />
      </Toolbar>
    </div>
  );
};
