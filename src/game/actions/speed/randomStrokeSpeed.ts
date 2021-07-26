import { createNotification } from "engine/notification";
import {
  getRandomStrokeSpeed as randomStrokeSpeedUtil,
  setStrokeSpeed,
} from "game/utils/strokeSpeed";

export const randomStrokeSpeed = async () => {
  const speed = randomStrokeSpeedUtil({ slow: 0, fast: 0 });

  createNotification({
    message: "Random Stroke Speed",
    delay: true,
  });

  setStrokeSpeed(speed);
};
randomStrokeSpeed.label = "Random Stroke Speed";
