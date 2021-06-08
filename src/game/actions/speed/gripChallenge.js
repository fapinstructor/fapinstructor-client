import store from "store";
import createNotification from "engine/createNotification";
import { getAverageStrokeSpeed, setStrokeSpeed } from "game/utils/strokeSpeed";
import { getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";
import { StrokeService, GripService } from "game/xstate/services";
import { GripStrength } from "game/xstate/machines/gripMachine";

const gripChallenge = async () => {
  const previousGripStrength = GripService.gripStrength;
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
    GripService.setGripStrength(GripStrength.DeathGrip);
    await delay(time * 1000);

    GripService.setGripStrength(GripStrength.BarelyTouching);
    await delay(time * 1000);
  }

  GripService.setGripStrength(previousGripStrength);
  setStrokeSpeed(previousStrokeSpeed);
};
gripChallenge.label = "Grip Challenge";

export default gripChallenge;
