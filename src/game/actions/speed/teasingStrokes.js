import store from "store";
import createNotification from "engine/createNotification";
import { setStrokeSpeed } from "game/utils/strokeSpeed";
import { getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";
import { StrokeService } from "game/xstate/services";

const teasingStrokes = async () => {
  const previousStrokeSpeed = StrokeService.strokeSpeed;
  const totalTime = getRandomInclusiveInteger(15, 40);

  createNotification({
    message: "Now go slow",
    duration: totalTime,
    showProgress: true,
    delay: true,
  });

  setStrokeSpeed(store.config.slowestStrokeSpeed);

  await delay(totalTime * 1000);

  setStrokeSpeed(previousStrokeSpeed);
};
teasingStrokes.label = "Teasing Strokes";

export default teasingStrokes;
