import { forwardRef, useCallback } from "react";

import { useResizeObserver } from "./hooks";
import { FabricProps } from "./types";

export const Fabric = forwardRef<HTMLCanvasElement, FabricProps>(
  ({ parentRef, onResize }, ref) => {
    const setDimensions = useCallback(
      ([entry]: ResizeObserverEntry[]) => {
        if (entry) {
          onResize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      },
      [onResize]
    );

    console.log(parentRef.current);
    useResizeObserver(parentRef, setDimensions);

    return <canvas ref={ref} />;
  }
);
