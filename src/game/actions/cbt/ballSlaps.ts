import { createNotification, dismissNotification } from "@/engine/notification";
import { getRandomInclusiveInteger } from "@/utils/math";
import { playCommand } from "@/engine/audio";
import { StrokeService } from "@/game/xstate/services";
import { pluralize } from "@/utils/pluralize";

export const ballSlaps = async () => {
  StrokeService.pause();

  const ballSlapCount = getRandomInclusiveInteger(3, 10);

  const nid = createNotification({
    message: `Slap your balls ${ballSlapCount} ${pluralize(
      "time",
      ballSlapCount
    )}`,
    duration: -1,
  });
  playCommand("slapBalls");

  const done = async () => {
    dismissNotification(nid);
    StrokeService.play();
  };
  done.label = "Finished Slapping";

  return [done];
};
ballSlaps.label = "Ball slaps";
