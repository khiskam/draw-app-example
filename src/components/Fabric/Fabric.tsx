import { forwardRef, useCallback } from "react";

import { useResizeObserver } from "./hooks";
import { FabricProps } from "./types";

export const Fabric = forwardRef<HTMLCanvasElement, FabricProps>(({ parentRef, onResize }, ref) => {
  const setDimensions = useCallback(
    (entries: ResizeObserverEntry[]) => {
      if (entries.length === 1) {
        onResize({
          width: entries[0].contentRect.width,
          height: entries[0].contentRect.height,
        });
      }
    },
    [onResize]
  );

  useResizeObserver(parentRef, setDimensions);

  return <canvas ref={ref} />;
});
