import * as React from "react";

export function useIsMounted() {
  const mounted = React.useRef(false);

  React.useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, [mounted]);

  return React.useCallback(() => mounted.current, []);
}
