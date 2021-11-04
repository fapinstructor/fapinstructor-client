import store from "@/store";
import { createNotification } from "@/engine/notification";
import { setStrokeSpeed } from "@/game/utils/strokeSpeed";
import { getRandomInclusiveInteger } from "@/utils/math";
import delay from "@/utils/delay";
import { StrokeService } from "@/game/xstate/services";

export const teasingStrokes = async () => {
  const previousStrokeSpeed = StrokeService.strokeSpeed;
  const totalTime = getRandomInclusiveInteger(15, 40);

  createNotification({
    message: "Now go slow",
    duration: totalTime * 1000,
    showProgress: true,
    delay: true,
  });

  setStrokeSpeed(store.config.strokeSpeed.min);

  await delay(totalTime * 1000);

  setStrokeSpeed(previousStrokeSpeed);
};
teasingStrokes.label = "Teasing Strokes";
