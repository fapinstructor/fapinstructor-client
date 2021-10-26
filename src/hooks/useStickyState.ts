import { useState, useEffect, Dispatch, SetStateAction } from "react";

export default function useStickyState<S extends Serializable>(
  defaultValue: S,
  key: string
): [S, Dispatch<SetStateAction<S>>] {
  const [value, setValue] = useState<S>(() => {
    try {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    } catch {
      // Security exception
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Security exception
    }
  }, [key, value]);

  return [value, setValue];
}
