import * as React from "react";

export default function useIsMounted() {
  const mounted = React.useRef(false);

  React.useEffect(() => {
    mounted.current = true;

    return function () {
      mounted.current = false;
    };
  }, [mounted]);

  return mounted.current;
}
