import store from "store";
import { createNotification } from "engine/notification";
import { getAverageStrokeSpeed, setStrokeSpeed } from "game/utils/strokeSpeed";
import { getRandomArbitrary, getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";
import { StrokeService } from "game/xstate/services";

export const headPalming = async () => {
  const previousStrokeSpeed = StrokeService.strokeSpeed;
  const palmCircleCount = getRandomInclusiveInteger(5, 20);
  const delayTime = 2;
  const palmSpeed = getRandomArbitrary(
    store.config.strokeSpeed.min,
    getAverageStrokeSpeed()
  );
  const palmTime = palmCircleCount / palmSpeed;
  const totalTime = palmTime + delayTime;

  createNotification({
    message: "Palm the head of your cock.  One full circle for each beat.",
    duration: totalTime * 1000,
    showProgress: true,
  });

  setStrokeSpeed(0);
  await delay(delayTime * 1000);

  setStrokeSpeed(palmSpeed);
  await delay(palmTime * 1000);

  setStrokeSpeed(0);
  await delay(delayTime * 1000);

  createNotification({ message: "Back to stroking" });

  setStrokeSpeed(previousStrokeSpeed);
};
headPalming.label = "Head Palming";

export default headPalming;
