import { TICK_DELAY } from "@/config";

import { interruptible } from "./interrupt";

/**
 * Creates an interruptible awaitable delay
 */
export function delay(ms = TICK_DELAY) {
  return new Promise((resolve, reject) =>
    interruptible({ id: window.setTimeout(resolve, ms), reject })
  );
}
