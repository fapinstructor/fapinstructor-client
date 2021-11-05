import { TIME_TO_TICK } from "@/components/organisms/BeatMeter/settings";

import { interruptible } from "./interrupt";

/**
 * Creates an interruptible awaitable delay
 */
export function delay(ms = TIME_TO_TICK) {
  return new Promise((resolve, reject) =>
    interruptible({ id: window.setTimeout(resolve, ms), reject })
  );
}
