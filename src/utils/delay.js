import { interruptible } from "engine/interrupt";

/**
 * Creates an interruptible awaitable delay
 */
const delay = (ms) =>
  new Promise((resolve, reject) =>
    interruptible(setTimeout(resolve, ms), reject)
  );

export default delay;
