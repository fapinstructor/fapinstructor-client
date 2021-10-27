import store from "store";
import { playCommand } from "engine/audio";
import { setStrokeSpeed } from "game/utils/strokeSpeed";
import { createNotification, dismissNotification } from "engine/notification";
import { handsOff } from "game/actions";
import { getToTheEdge, rideTheEdge } from "./edge";
import { startStrokingAgain } from "../speed";

export function ruin(completed: () => void) {
  return getToTheEdge(async () => {
    await rideTheEdge();

    setStrokeSpeed(store.config.strokeSpeed.max);
    playCommand("ruin");
    const notificationId = createNotification({ message: "Ruin it!" });

    function cleanup() {
      dismissNotification(notificationId);
    }

    async function ruinedTrigger() {
      cleanup();
      await ruined();

      return completed();
    }
    ruinedTrigger.label = "Ruined!";

    return [ruinedTrigger];
  });
}

export function finalRuin(completed: () => void) {
  return ruin(async () => {
    createNotification({
      message:
        "I hope you enjoyed your ruined orgasm, next time you might actually get to enjoy a full one.",
      duration: -1,
    });

    function finishedTrigger() {
      return completed();
    }
    finishedTrigger.label = "End Game";

    return [finishedTrigger];
  });
}

export async function ruined() {
  store.game.ruins++;

  playCommand("ruined");
  await handsOff(store.config.ruinCooldown * 1000);
}

export async function accidentallyRuined() {
  await ruined();
  await startStrokingAgain();
}
