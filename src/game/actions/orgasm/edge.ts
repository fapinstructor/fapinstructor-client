import store from "@/store";
import { playCommand } from "@/game/engine/audio";
import { getRandomStrokeSpeed, setStrokeSpeed } from "@/game/utils/strokeSpeed";
import {
  createNotification,
  dismissNotification,
} from "@/game/engine/notification";
import { chance, getRandomInclusiveInteger } from "@/utils/math";
import { delay } from "@/game/engine/delay";
import { handsOff } from "@/game/actions";
import { getRandomEdgeMessage } from "@/game/texts/messages";
import { GripService } from "@/game/xstate/services";

import { startStrokingAgain } from "../speed";

export async function edge() {
  return getToTheEdge(async () => {
    // TODO: Remove magic number
    if (chance(50)) {
      await rideTheEdge();
    }
    await edged();
  });
}

export async function getToTheEdge(edging: () => void) {
  setStrokeSpeed(store.config.strokeSpeed.max);
  await delay();

  playCommand("edge");
  GripService.resetGripStrength();
  const notificationId = createNotification({
    message: getRandomEdgeMessage(),
    duration: -1,
  });

  function cleanup() {
    dismissNotification(notificationId);
  }

  function edgingTrigger() {
    cleanup();
    return edging();
  }
  edgingTrigger.label = "Edging";

  function failedToEdgeTrigger() {
    cleanup();
    setStrokeSpeed(getRandomStrokeSpeed());
  }
  failedToEdgeTrigger.label = "I can't";

  return [edgingTrigger, failedToEdgeTrigger];
}

const RIDE_EDGE_DURATION_MIN = 5_000;
const RIDE_EDGE_DURATION_MAX = 30_000;

export async function rideTheEdge(
  duration = getRandomInclusiveInteger(
    RIDE_EDGE_DURATION_MIN,
    RIDE_EDGE_DURATION_MAX
  )
) {
  // Slow stroke speed by 20%.
  setStrokeSpeed(store.config.strokeSpeed.max * 0.8);

  const notificationId = createNotification({
    message: "Ride the edge",
    duration: -1,
  });

  playCommand("keepStroking");

  await delay(duration);
  dismissNotification(notificationId);
}

export async function edged() {
  store.game.edges++;

  await handsOff(store.config.edgeCooldown * 1000);
  await startStrokingAgain();
}
