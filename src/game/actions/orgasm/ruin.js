import store from "store";
import createNotification, {
  dismissNotification,
} from "engine/createNotification";
import { getRandomStrokeSpeed, setStrokeSpeed } from "game/utils/strokeSpeed";
import delay from "utils/delay";
import { playCommand } from "engine/audio";
import audioLibrary, { getRandomAudioVariation } from "audio";
import { setRandomStrokeStyle } from "game/enums/StrokeStyle";
import { MediaService, StrokeService } from "game/xstate/services";

export const ruinedOrgasm = async () => {
  if (MediaService.paused) {
    MediaService.play();
  }

  store.game.ruins++;

  playCommand(getRandomAudioVariation("Ruined"));

  const {
    config: { ruinCooldown },
  } = store;

  StrokeService.pause();

  await delay(ruinCooldown * 1000);

  setStrokeSpeed(getRandomStrokeSpeed());
  await setRandomStrokeStyle();
  StrokeService.play();
  createNotification({ message: "Start stroking again" });

  playCommand(audioLibrary.StartStrokingAgain);

  await delay(3000);
};

const ruinOrgasm = async () => {
  const {
    config: { fastestStrokeSpeed },
  } = store;
  const notificationId = createNotification({ message: "Ruin it" });

  playCommand(audioLibrary.RuinItForMe);

  setStrokeSpeed(fastestStrokeSpeed);

  const trigger = async () => {
    dismissNotification(notificationId);
    await ruinedOrgasm();
  };
  trigger.label = "Ruined";

  return [trigger];
};

export default ruinOrgasm;
