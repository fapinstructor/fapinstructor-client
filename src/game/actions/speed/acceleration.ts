import store from "@/store";
import { createNotification } from "@/engine/notification";
import { setStrokeSpeed } from "@/game/utils/strokeSpeed";
import delay from "@/utils/delay";
import { playCommand } from "@/engine/audio";
import { StrokeService } from "@/game/xstate/services";

export const acceleration = async () => {
  const previousStrokeSpeed = StrokeService.strokeSpeed;

  createNotification({
    message: "Accelerated stroking",
    delay: true,
  });

  setStrokeSpeed(store.config.strokeSpeed.min);

  let audioPlayed = false;

  while (StrokeService.strokeSpeed < store.config.strokeSpeed.max) {
    setStrokeSpeed(StrokeService.strokeSpeed * 1.05);
    await delay(1000);

    if (
      !audioPlayed &&
      StrokeService.strokeSpeed > store.config.strokeSpeed.max / 3
    ) {
      playCommand("longMoan");
      audioPlayed = true;
    }
  }

  setStrokeSpeed(previousStrokeSpeed);
};
acceleration.label = "Acceleration Strokes";
