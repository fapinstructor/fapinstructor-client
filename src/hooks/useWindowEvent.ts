import { useEffect } from "react";

export default function useWindowEvent<K extends keyof WindowEventMap>(
  event: K,
  listener: (this: Window, ev: WindowEventMap[K]) => void
) {
  useEffect(() => {
    window.addEventListener(event, listener);

    return () => {
      window.removeEventListener(event, listener);
    };
  }, [event, listener]);
}
