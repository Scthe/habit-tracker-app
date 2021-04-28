import { useEffect, useRef } from "react";

type CbFnType = () => void;

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback: CbFnType, delayMs: number): void {
  const savedCallback = useRef<CbFnType>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current && savedCallback.current();
    }
    if (delayMs !== null) {
      const id = setInterval(tick, delayMs);
      return () => clearInterval(id);
    }
    return undefined;
  }, [delayMs]);
}
