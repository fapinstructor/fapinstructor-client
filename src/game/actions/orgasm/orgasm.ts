import store from "@/store";
import { playCommand } from "@/engine/audio";
import {
  getAverageStrokeSpeed,
  setStrokeSpeed,
} from "@/game/utils/strokeSpeed";
import { createNotification, dismissNotification } from "@/engine/notification";
import { getRandomInclusiveInteger } from "@/utils/math";
import delay from "@/utils/delay";
import { getToTheEdge, rideTheEdge } from "./edge";

export function orgasm(orgasmed: () => void) {
  return getToTheEdge(async () => {
    await rideTheEdge();

    setStrokeSpeed(store.config.strokeSpeed.max);
    playCommand("orgasm");
    const notificationId = createNotification({
      message: "You have permission to have a full orgasm",
    });

    function cleanup() {
      dismissNotification(notificationId);
    }

    async function orgasmTrigger() {
      cleanup();

      store.game.orgasms++;

      return orgasmed();
    }
    orgasmTrigger.label = "I'm Cumming!";

    return [orgasmTrigger];
  });
}

async function postOrgasmTorture() {
  setStrokeSpeed(store.config.strokeSpeed.max);

  const notificationId = createNotification({
    message: "Time for a little post-orgasm torture, don't you dare stop!",
  });

  await delay(
    getRandomInclusiveInteger(
      store.config.postOrgasmTortureDuration.min,
      store.config.postOrgasmTortureDuration.max
    ) * 1000
  );

  dismissNotification(notificationId);

  createNotification({
    message: "I guess you've had enough.  You may stop.",
  });
}

export function finalOrgasm(completed: () => void) {
  return orgasm(async () => {
    if (store.config.postOrgasmTorture) {
      await postOrgasmTorture();
    } else {
      // While cumming, slow down stroke speed
      setStrokeSpeed(getAverageStrokeSpeed());
      await delay(5_000);

      setStrokeSpeed(getAverageStrokeSpeed() / 2);
      await delay(5_000);
    }

    // Continue stroking at the slowest speed until the game is ended.
    setStrokeSpeed(store.config.strokeSpeed.min);

    createNotification({
      message:
        "I hope you enjoyed your orgasm, next time you might not be so lucky.",
      duration: -1,
    });

    function finishedTrigger() {
      return completed();
    }
    finishedTrigger.label = "End Game";

    return [finishedTrigger];
  });
}
