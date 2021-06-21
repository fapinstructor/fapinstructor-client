import store from "store";
import { playCommand } from "engine/audio";
import audioLibrary from "audio";
import { getRandomStrokeSpeed, setStrokeSpeed } from "game/utils/strokeSpeed";
import { setDefaultStrokeStyle } from "game/enums/StrokeStyle";
import createNotification, {
  dismissNotification,
} from "engine/createNotification";
import { getRandomBoolean, getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";
import { handsOff } from "game/actions";
import { getRandomEdgeMessage } from "game/texts/messages";
import { GripService, StrokeService } from "game/xstate/services";

export const rideTheEdge = async (time = getRandomInclusiveInteger(5, 30)) => {
  const previousStrokeSpeed = StrokeService.strokeSpeed;
  setStrokeSpeed(store.config.fastestStrokeSpeed);

  const notificationId = createNotification({
    message: "Ride the edge",
    duration: -1,
  });

  playCommand(audioLibrary.KeepStroking);

  await delay(time * 1000);
  dismissNotification(notificationId);
  setStrokeSpeed(previousStrokeSpeed);
};

export const edging = async () => {
  store.game.edges++;

  const rideEdge = getRandomBoolean();

  if (rideEdge) {
    await rideTheEdge();
  }
};

export const edged = async () => {
  StrokeService.pause();

  await handsOff(store.config.edgeCooldown);

  setStrokeSpeed(getRandomStrokeSpeed());
  StrokeService.play();

  playCommand(audioLibrary.StartStrokingAgain);
  await delay(2000);
};

export const getToTheEdge = async (message = getRandomEdgeMessage()) => {
  const {
    config: { fastestStrokeSpeed },
  } = store;
  playCommand(audioLibrary.Edge);

  setStrokeSpeed(fastestStrokeSpeed);

  GripService.resetGripStrength();
  setDefaultStrokeStyle();

  return createNotification({ message, duration: -1 });
};

export const edge = async (message = getRandomEdgeMessage()) => {
  const notificationId = await getToTheEdge(message);

  const trigger = async () => {
    dismissNotification(notificationId);
    await edging();
    await edged();
  };
  trigger.label = "Edging";

  const trigger_fail = async () => {
    dismissNotification(notificationId);
  };
  trigger_fail.label = "I can't";

  return [trigger, trigger_fail];
};
