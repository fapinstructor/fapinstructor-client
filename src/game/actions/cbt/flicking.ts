import { createNotification } from "@/engine/notification";
import { getRandomStrokeSpeed, setStrokeSpeed } from "@/game/utils/strokeSpeed";
import { getRandomInclusiveInteger } from "@/utils/math";
import delay from "@/utils/delay";
import { StrokeService } from "@/game/xstate/services";

export const flickCockHead = async () => {
  const previousStrokeSpeed = StrokeService.strokeSpeed;
  const flickCount = getRandomInclusiveInteger(3, 6);
  const delayTime = 2;
  const flickSpeed = getRandomStrokeSpeed({ fast: 2 });
  const flickTime = flickCount / flickSpeed;
  const totalTime = flickTime + delayTime;

  createNotification({
    message: `Flick the head of your cock ${flickCount} times`,
    duration: totalTime * 1000,
    showProgress: true,
  });

  setStrokeSpeed(0);
  await delay(delayTime * 1000);

  setStrokeSpeed(flickSpeed);
  await delay(flickTime * 1000);

  setStrokeSpeed(0);
  await delay(delayTime * 1000);

  createNotification({ message: `Back to stroking` });

  setStrokeSpeed(previousStrokeSpeed);
};
flickCockHead.label = "Flick Cock Head";
