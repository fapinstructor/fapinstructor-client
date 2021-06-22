import createNotification from "engine/createNotification";
import { getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";
import { setStrokeStyle } from "game/enums/StrokeStyle";
import { getRandomHandsOffMessage } from "game/texts/messages";
import { StrokeService } from "game/xstate/services";
import { setStrokeStyleHandsOff } from "game/actions";
import audioLibrary from "audio";
import { playCommand } from "engine/audio";

const HANDS_OFF_DURATION_MIN = 10; // Seconds
const HANDS_OFF_DURATION_MAX = 25; // Seconds

export const handsOff = async (
  duration = getRandomInclusiveInteger(
    HANDS_OFF_DURATION_MIN,
    HANDS_OFF_DURATION_MAX
  )
) => {
  createNotification({
    message: getRandomHandsOffMessage(),
    duration: duration * 1000,
    showProgress: true,
  });

  StrokeService.pause();

  await setStrokeStyleHandsOff();

  await delay(duration * 1000);

  StrokeService.play();
  await setStrokeStyle();
  createNotification({ message: "Start stroking again" });
  playCommand(audioLibrary.StartStrokingAgain);
};
handsOff.label = "Hands Off";
