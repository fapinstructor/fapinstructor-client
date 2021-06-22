import store from "store";
import createNotification, {
  dismissNotification,
} from "engine/createNotification";
import { setStrokeSpeed } from "game/utils/strokeSpeed";
import { playCommand } from "engine/audio";
import audioLibrary, { getRandomAudioVariation } from "audio";
import { handsOff } from "game/actions";

export const ruinedOrgasm = async () => {
  playCommand(getRandomAudioVariation("Ruined"));
  store.game.ruins++;

  store.game.cooldown = true;
  await handsOff(store.config.ruinCooldown);
  store.game.cooldown = false;
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
