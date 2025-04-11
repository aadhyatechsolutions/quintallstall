// hooks/useResizeObserver.js
import { useEffect, useRef } from "react";

export const useResizeObserver = (callback) => {
  const ref = useRef();

  useEffect(() => {
    const observer = new ResizeObserver(() => callback());
    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [callback]);

  return ref;
};
