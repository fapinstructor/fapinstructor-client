import {
  getRandomStrokeSpeed as randomStrokeSpeedUtil,
  setStrokeSpeed,
} from "game/utils/strokeSpeed";

export const randomStrokeSpeed = async () => {
  const speed = randomStrokeSpeedUtil({ slow: 0, fast: 0 });
  setStrokeSpeed(speed);
};
randomStrokeSpeed.label = "Random Stroke Speed";
