import store from "store";
import { createNotification } from "engine/notification";
import { getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";
import { setStrokeStyle } from "game/enums/StrokeStyle";
import { getRandomHandsOffMessage } from "game/texts/messages";
import { StrokeService } from "game/xstate/services";
import { setStrokeStyleHandsOff } from "game/actions";
import audioLibrary from "audio";
import { playCommand } from "engine/audio";
import { getAverageStrokeSpeed } from "game/utils/strokeSpeed";

const HANDS_OFF_DURATION_MIN = 10_000;
const HANDS_OFF_DURATION_MAX = 30_000;

export const handsOff = async (
  duration = getRandomInclusiveInteger(
    HANDS_OFF_DURATION_MIN,
    HANDS_OFF_DURATION_MAX
  )
) => {
  store.game.cooldown = true;
  createNotification({
    message: getRandomHandsOffMessage(),
    duration,
    showProgress: true,
  });

  StrokeService.pause();

  await setStrokeStyleHandsOff();

  await delay(duration);
  store.game.cooldown = false;
};
handsOff.label = "Hands Off";

export async function startStrokingAgain() {
  StrokeService.setStrokeSpeed(getAverageStrokeSpeed());
  StrokeService.play();

  await setStrokeStyle();
  createNotification({ message: "Start stroking again" });
  playCommand(audioLibrary.StartStrokingAgain);
}
