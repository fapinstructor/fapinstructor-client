import { playVoice } from "engine/audio";
import delay from "utils/delay";
import { StrokeService } from "game/xstate/services";
import { setStrokeSpeed, getRandomStrokeSpeed } from "game/utils/strokeSpeed";
import getRandomDuration from "game/utils/getRandomDuration";

export const doubleStrokes = async () => {
  const duration = getRandomDuration(5, 20);

  setStrokeSpeed(StrokeService.strokeSpeed * 2);

  playVoice("Faster");

  await delay(duration);
  setStrokeSpeed(getRandomStrokeSpeed());
};
doubleStrokes.label = "Double Strokes";
