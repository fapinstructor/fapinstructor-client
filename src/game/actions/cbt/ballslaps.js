import createNotification from "engine/createNotification";
import { getRandomStrokeSpeed, setStrokeSpeed } from "game/utils/strokeSpeed";
import { getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";
import { playCommand } from "engine/audio";
import audioLibrary from "audio";
import { StrokeService } from "game/xstate/services";

const ballslaps = async () => {
  const previousStrokeSpeed = StrokeService.strokeSpeed;
  const ballSlapCount = getRandomInclusiveInteger(3, 10);
  const delayTime = 2;
  const ballSlapSpeed = getRandomStrokeSpeed({ fast: 2 });
  const ballSlapTime = ballSlapCount / ballSlapSpeed;
  const totalTime = ballSlapTime + delayTime;

  createNotification({
    message: `Slap your balls ${ballSlapCount}`,
    duration: totalTime * 1000,
    showProgress: true,
    delay: true,
  });

  playCommand(audioLibrary.SlapBalls);

  setStrokeSpeed(0);
  await delay(delayTime * 1000);

  setStrokeSpeed(ballSlapSpeed);
  await delay(ballSlapTime * 1000);

  setStrokeSpeed(0);
  await delay(delayTime * 1000);

  createNotification({
    message: `Back to stroking`,
    delay: true,
  });

  setStrokeSpeed(previousStrokeSpeed);
};
ballslaps.label = "Ball slaps";

export default ballslaps;
