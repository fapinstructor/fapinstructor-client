import store from "store";
import { playCommand } from "engine/audio";
import audioLibrary from "audio";
import { getRandomStrokeSpeed, setStrokeSpeed } from "game/utils/strokeSpeed";
import createNotification, {
  dismissNotification,
} from "engine/createNotification";
import { getRandomBoolean, getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";
import { handsOff } from "game/actions";
import { getRandomEdgeMessage } from "game/texts/messages";
import { GripService } from "game/xstate/services";
import { ruinOrgasm } from "./ruin";

export const rideTheEdge = async (time = getRandomInclusiveInteger(5, 30)) => {
  // Once on the edge, slow down speed by 20%
  setStrokeSpeed(store.config.fastestStrokeSpeed * 0.8);

  const notificationId = createNotification({
    message: "Ride the edge",
    duration: -1,
  });

  playCommand(audioLibrary.KeepStroking);

  await delay(time * 1000);
  dismissNotification(notificationId);
  setStrokeSpeed(getRandomStrokeSpeed());
};

export const edging = async () => {
  if (getRandomBoolean()) {
    await rideTheEdge();
  }
};

export const edged = async () => {
  store.game.edges++;

  store.game.cooldown = true;
  await handsOff(store.config.edgeCooldown);
  store.game.cooldown = false;
};

export const getToTheEdge = async (message = getRandomEdgeMessage()) => {
  const {
    config: { fastestStrokeSpeed },
  } = store;
  setStrokeSpeed(fastestStrokeSpeed);
  await delay();

  playCommand(audioLibrary.Edge);
  GripService.resetGripStrength();

  return createNotification({ message, duration: -1 });
};

export const edge = async ({ ruin = false } = {}) => {
  const notificationId = await getToTheEdge(getRandomEdgeMessage());

  const edgingTrigger = async () => {
    dismissNotification(notificationId);
    await edging();

    if (ruin) {
      await delay();
      return await ruinOrgasm();
    } else {
      await edged();
    }
  };
  edgingTrigger.label = "Edging";

  const couldntEdgeTrigger = async () => {
    dismissNotification(notificationId);
    await handsOff(store.config.edgeCooldown);
  };
  couldntEdgeTrigger.label = "I can't";

  return [edgingTrigger, couldntEdgeTrigger];
};
