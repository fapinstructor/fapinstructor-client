import { StrokeService } from "@/game/xstate/services";
import { getRandomStrokeSpeed } from "@/game/utils/strokeSpeed";
import { createNotification, dismissNotification } from "@/engine/notification";
import delay from "@/utils/delay";

const warmup = async () => {
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

    StrokeService.setStrokeSpeed(0.5);

    await delay(segment1);
    StrokeService.setStrokeSpeed(1);
    await delay(segment2);

    dismissNotification(nid);

    await delay(1000);

    StrokeService.setStrokeSpeed(strokeSpeed);
  };
  warmup.label = "Warm up";

  const ready = async () => {
    StrokeService.play();
    StrokeService.setStrokeSpeed(strokeSpeed);
  };
  ready.label = "I'm Ready!";

  return [warmup, ready];
};

warmup.label = "Warm Up";

export default warmup;
