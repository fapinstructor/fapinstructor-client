import { useState, useEffect, Dispatch, SetStateAction } from "react";

export default function useStickyState<S extends Serializable>(
  defaultValue: S,
  key: string
): [S, Dispatch<SetStateAction<S>>] {
  const [value, setValue] = useState<S>(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
