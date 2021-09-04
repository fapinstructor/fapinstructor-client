import * as React from "react";

export default function usePrevious<State>(value: State) {
  const ref = React.useRef<State>();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
