import store from "store";
import { setStrokeSpeed } from "game/utils/strokeSpeed";
import delay from "utils/delay";
import { playCommand } from "engine/audio";
import audioLibrary from "audio";
import { StrokeService } from "game/xstate/services";

const acceleration = async () => {
  const {
    config: { slowestStrokeSpeed, fastestStrokeSpeed },
  } = store;
  const previousStrokeSpeed = StrokeService.strokeSpeed;

  setStrokeSpeed(slowestStrokeSpeed);

  let audioPlayed = false;

  while (StrokeService.strokeSpeed < fastestStrokeSpeed) {
    setStrokeSpeed(StrokeService.strokeSpeed * 1.05);
    await delay(1000);

    if (!audioPlayed && StrokeService.strokeSpeed > fastestStrokeSpeed / 3) {
      playCommand(audioLibrary.LongMoan);
      audioPlayed = true;
    }
  }

  setStrokeSpeed(previousStrokeSpeed);
};
acceleration.label = "Acceleration Strokes";

export default acceleration;
