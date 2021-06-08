import createNotification, {
  dismissNotification,
} from "engine/createNotification";
import { StrokeService } from "game/xstate/services";
import { playCommand } from "engine/audio";
import { getRandomAudioVariation } from "audio";

const eatPrecum = async () => {
  StrokeService.pause();
  const notificationId = createNotification({
    message: "Squeeze your cock and eat up all of your precum",
    duration: -1,
    delay: true,
  });

  playCommand(getRandomAudioVariation("CEI"));

  const done = async () => {
    StrokeService.play();
    dismissNotification(notificationId);
  };
  done.label = "Swallowed";

  return [done];
};
eatPrecum.label = "Eat Precum";

export default eatPrecum;
