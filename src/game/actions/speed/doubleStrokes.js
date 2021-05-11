import createInstruction from "game/actions/createInstruction";
import { StrokeService } from "game/xstate/services";

const doubleStrokes = async ({
  playVoice,
  delay,
  setStrokeSpeed,
  getRandomStrokeSpeed,
  getRandomDuration,
}) => {
  const duration = getRandomDuration(5, 20);

  setStrokeSpeed(StrokeService.strokeSpeed * 2);

  playVoice("Faster");

  await delay(duration);
  setStrokeSpeed(getRandomStrokeSpeed());
};

export default createInstruction(doubleStrokes, {
  label: "Double Strokes",
});
