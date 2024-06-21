import { useEffect } from "react";

export const useResizeObserver = <T extends HTMLElement>(
  dependency: React.RefObject<T>,
  callback: (entries: ResizeObserverEntry[]) => void
) => {
  useEffect(() => {
    const observer = new ResizeObserver(callback);

    if (dependency.current) {
      observer.observe(dependency.current);
    }

    return () => observer.disconnect();
  }, [dependency, callback]);
};
