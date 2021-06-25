import createNotification, {
  dismissNotification,
} from "engine/createNotification";
import { getRandomInclusiveInteger } from "utils/math";
import { playCommand } from "engine/audio";
import audioLibrary from "audio";
import { StrokeService } from "game/xstate/services";
import { pluralize } from "utils/pluralize";

export const ballslaps = async () => {
  StrokeService.pause();

  const ballSlapCount = getRandomInclusiveInteger(3, 10);

  const nid = createNotification({
    message: `Slap your balls ${ballSlapCount} ${pluralize(
      "time",
      ballSlapCount
    )}`,
    duration: -1,
  });
  playCommand(audioLibrary.SlapBalls);

  const done = async () => {
    dismissNotification(nid);
    StrokeService.play();
  };
  done.label = "Finished Slapping";

  return [done];
};
ballslaps.label = "Ball slaps";
