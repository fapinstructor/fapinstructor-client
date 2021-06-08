import createInstruction from "game/actions/createInstruction";
import { StrokeService } from "game/xstate/services";

const warmup = async ({
  createNotification,
  dismissNotification,
  getRandomStrokeSpeed,
  delay,
  setStrokeSpeed,
}) => {
  setStrokeSpeed(0);
  const strokeSpeed = getRandomStrokeSpeed({ fast: getRandomStrokeSpeed() });

  const warmup = async () => {
    StrokeService.play();
    const segment1 = 30 * 1000;
    const segment2 = 60 * 1000;

    const nid = createNotification({
      message: `Warming up`,
      duration: segment1 + segment2,
      showProgress: true,
    });

    setStrokeSpeed(0.5);
    await delay(segment1);
    setStrokeSpeed(1);
    await delay(segment2);

    dismissNotification(nid);

    await delay(1000);

    setStrokeSpeed(strokeSpeed);
  };
  warmup.label = "Warm up";

  const ready = async () => {
    StrokeService.play();
    await delay(1000);
    setStrokeSpeed(strokeSpeed);
  };
  ready.label = "I'm Ready!";

  return [warmup, ready];
};

export default createInstruction(warmup, {
  label: "Warm Up",
});
