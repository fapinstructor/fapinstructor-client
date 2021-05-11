import store from "store";
import createNotification from "engine/createNotification";
import { getAverageStrokeSpeed, setStrokeSpeed } from "game/utils/strokeSpeed";
import { getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";
import { setDeathGrip, setBarelyTouching, setGrip } from "../grip";
import { StrokeService } from "game/xstate/services";

const gripChallenge = async () => {
  const previousGripStrength = store.game.gripStrength;
  const previousStrokeSpeed = StrokeService.strokeSpeed;
  createNotification({
    message: "Get ready for a grip challenge!",
    delay: true,
  });
  await delay(5000);

  const sets = getRandomInclusiveInteger(2, 5);
  const reps = getRandomInclusiveInteger(10, 30);

  const speed = (getAverageStrokeSpeed() + store.config.fastestStrokeSpeed) / 2;
  const time = reps / speed;

  setStrokeSpeed(speed);

  for (let i = 0; i < sets; i++) {
    setDeathGrip();
    await delay(time * 1000);

    setBarelyTouching();
    await delay(time * 1000);
  }

  setGrip(previousGripStrength);
  setStrokeSpeed(previousStrokeSpeed);
};
gripChallenge.label = "Grip Challenge";

export default gripChallenge;
