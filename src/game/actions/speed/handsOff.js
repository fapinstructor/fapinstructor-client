import createNotification from "engine/createNotification";
import { getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";
import { setStrokeStyle, setStrokeStyleHandsOff } from "game/enums/StrokeStyle";
import { getRandomHandsOffMessage } from "game/texts/messages";
import { StrokeService } from "game/xstate/services";

const HANDS_OFF_DURATION_MIN = 10; // Seconds
const HANDS_OFF_DURATION_MAX = 25; // Seconds

/**
 * Task to not touch ones cock
 * catches current strokeStyle and applies it after *duration* again.
 * Except the current strokeStyle is already HandsOff, in this specific case the caller has to deal with the style.
 * This avoids cascading function calls.
 *
 * @param duration
 *   The duration how long the break shall last in s
 *
 * @since       07.10.2018
 * @author      the1nstructor
 *
 * @alias       handsOff
 * @memberof    actions
 */
const handsOff = async (
  duration = getRandomInclusiveInteger(
    HANDS_OFF_DURATION_MIN,
    HANDS_OFF_DURATION_MAX
  )
) => {
  createNotification({
    message: getRandomHandsOffMessage(),
    duration: duration * 1000,
    showProgress: true,
    delay: true,
  });

  StrokeService.pause();

  await setStrokeStyleHandsOff();

  await delay(duration * 1000);

  StrokeService.play();
  await setStrokeStyle();
  createNotification({ message: "Start stroking again" });
};
handsOff.label = "Hands Off";

export default handsOff;
