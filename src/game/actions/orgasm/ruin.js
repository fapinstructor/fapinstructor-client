import store from "store";
import createNotification, {
  dismissNotification,
} from "engine/createNotification";
import { getRandomStrokeSpeed, setStrokeSpeed } from "game/utils/strokeSpeed";
import delay from "utils/delay";
import { playCommand } from "engine/audio";
import audioLibrary, { getRandomAudioVariation } from "audio";
import {
  strokerRemoteControl,
  clearStrokeEmissions,
} from "game/loops/strokeEmitter";
import elapsedGameTime from "game/utils/elapsedGameTime";
import { setRandomStrokeStyle } from "game/enums/StrokeStyle";
import { MediaService } from "game/xstate/services";
import { StrokeService } from "game/xstate/services";

export const shouldRuin = () => {
  const {
    game: { ruins },
    config: {
      maximumRuinedOrgasms,
      minimumGameTime,
      maximumGameTime,
      actionFrequency,
      fastestStrokeSpeed,
    },
  } = store;

  let result = false;
  const isAllowedChance =
    ruins < maximumRuinedOrgasms &&
    elapsedGameTime("minutes") >= minimumGameTime * 1.3 &&
    StrokeService.strokeSpeed >= fastestStrokeSpeed / 1.7;

  if (isAllowedChance) {
    const rand = Math.random();
    const gameCompletionPercent =
      elapsedGameTime("seconds") / (maximumGameTime * 60);

    if (elapsedGameTime("minutes") >= maximumGameTime) {
      // If the game time has gone over return true
      result = true;
    } else {
      // Probability Graph: https://www.desmos.com/calculator/xhyaj1gxuc
      result = gameCompletionPercent ** 4 / actionFrequency > rand;
    }
  }

  return result;
};

export const ruinedOrgasm = async () => {
  if (MediaService.instance.state.matches("paused")) {
    MediaService.play();
  }

  store.game.ruins++;

  playCommand(getRandomAudioVariation("Ruined"));

  const {
    config: { ruinCooldown },
  } = store;

  clearStrokeEmissions();
  strokerRemoteControl.pause();

  await delay(ruinCooldown * 1000);

  setStrokeSpeed(getRandomStrokeSpeed());
  await setRandomStrokeStyle();
  strokerRemoteControl.play();
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
