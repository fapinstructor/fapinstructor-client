import createNotification from "engine/createNotification";
import { getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";
import { setStrokeStyle, setStrokeStyleHandsOff } from "game/enums/StrokeStyle";
import { getRandom_handsOff_message } from "game/texts/messages";
import { strokerRemoteControl } from "game/loops/strokeEmitter";

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
    message: getRandom_handsOff_message(),
    duration: duration * 1000,
    showProgress: true,
    delay: true,
  });

  strokerRemoteControl.pause();

  await setStrokeStyleHandsOff();

  await delay(duration * 1000);

  strokerRemoteControl.play();
  await setStrokeStyle();
  createNotification({ message: "Start stroking again" });
};
handsOff.label = "Hands Off";

export default handsOff;
