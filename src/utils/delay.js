import { interruptible } from "engine/interrupt";
import { TIME_TO_TICK } from "components/organisms/BeatMeter/settings";

/**
 * Creates an interruptible awaitable delay
 */
const delay = (ms = TIME_TO_TICK) =>
  new Promise((resolve, reject) =>
    interruptible(setTimeout(resolve, ms), reject)
  );

export default delay;
