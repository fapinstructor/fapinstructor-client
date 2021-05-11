import store from "store";
import createNotification from "engine/createNotification";
import { getAverageStrokeSpeed, setStrokeSpeed } from "game/utils/strokeSpeed";
import delay from "utils/delay";
import { getRandomArbitrary, getRandomInclusiveInteger } from "utils/math";
import play from "engine/audio";
import audioLibrary from "audio";
import { StrokeService } from "game/xstate/services";

const redLightGreenLight = async () => {
  const {
    config: { fastestStrokeSpeed },
    enableVoice,
  } = store;
  const previousStrokeSpeed = StrokeService.strokeSpeed;

  let timeLeft = getRandomInclusiveInteger(30, 60);
  let isGreen = false;

  createNotification({
    message: "Stop and Go!",
    delay: true,
  });

  if (enableVoice) {
    play(audioLibrary.Obey);
  }

  while (timeLeft > 0) {
    if (isGreen) {
      const fastSpeed = getRandomArbitrary(
        getAverageStrokeSpeed(),
        fastestStrokeSpeed
      );

      setStrokeSpeed(fastSpeed);
      isGreen = false;
    } else {
      setStrokeSpeed(0);
      isGreen = true;
    }
    const delayedTime = getRandomInclusiveInteger(2, 10);
    timeLeft = timeLeft - delayedTime;

    await delay(delayedTime * 1000);
  }

  setStrokeSpeed(previousStrokeSpeed);
};
redLightGreenLight.label = "Red Light/Green Light";

export default redLightGreenLight;
