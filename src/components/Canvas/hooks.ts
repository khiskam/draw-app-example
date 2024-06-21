import { useEffect, useRef } from "react";

import { Actions } from "@/store";

export const useInit = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      Actions.init(canvasRef.current);
    }

    return () => Actions.destroy();
  }, []);

  return { canvasRef };
};
