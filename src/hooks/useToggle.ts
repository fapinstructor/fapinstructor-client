import { useCallback, useState } from "react";

export default function useToggle(defaultValue = false): [boolean, () => void] {
  const [value, setValue] = useState(defaultValue);

  const toggler = useCallback(() => {
    setValue((prevValue) => !prevValue);
  }, []);

  return [value, toggler];
}
