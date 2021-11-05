import { playCommand } from "@/game/engine/audio";
import { createNotification } from "@/game/engine/notification";
import { getRandomDeniedMessage } from "@/game/texts/messages";
import { StrokeService } from "@/game/xstate/services";
import { getToTheEdge, rideTheEdge } from "./edge";

export function deny(denied: () => void) {
  return getToTheEdge(async () => {
    await rideTheEdge();

    StrokeService.pause();
    playCommand("denied");
    createNotification({ message: getRandomDeniedMessage() });

    function finishedTrigger() {
      return denied();
    }
    finishedTrigger.label = "Denied";

    return [finishedTrigger];
  });
}
