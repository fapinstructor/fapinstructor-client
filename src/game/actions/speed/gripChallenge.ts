import store from "@/store";
import { createNotification } from "@/engine/notification";
import {
  getAverageStrokeSpeed,
  setStrokeSpeed,
} from "@/game/utils/strokeSpeed";
import { getRandomInclusiveInteger } from "@/utils/math";
import delay from "@/utils/delay";
import { StrokeService, GripService } from "@/game/xstate/services";
import { GripStrength } from "@/game/xstate/machines/gripMachine";

export const gripChallenge = async () => {
  const previousGripStrength = GripService.gripStrength;
  const previousStrokeSpeed = StrokeService.strokeSpeed;

  const sets = getRandomInclusiveInteger(2, 5);
  const reps = getRandomInclusiveInteger(10, 30);

  const speed = (getAverageStrokeSpeed() + store.config.strokeSpeed.max) / 2;
  const time = reps / speed;

  createNotification({
    message: "Time for a grip challenge!",
    duration: time * 2 * sets * 1000, // * 2 is for the two delays in the loop
    showProgress: true,
    delay: true,
  });

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
