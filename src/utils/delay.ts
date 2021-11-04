import { interruptible } from "@/engine/interrupt";
import { TIME_TO_TICK } from "@/components/organisms/BeatMeter/settings";

/**
 * Creates an interruptible awaitable delay
 */
export default function delay(ms = TIME_TO_TICK) {
  return new Promise((resolve, reject) =>
    interruptible({ id: window.setTimeout(resolve, ms), reject })
  );
}
