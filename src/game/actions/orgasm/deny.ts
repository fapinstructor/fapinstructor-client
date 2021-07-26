import { playCommand } from "engine/audio";
import { getRandomAudioVariation } from "audio";
import { createNotification } from "engine/notification";
import { getRandomDeniedMessage } from "game/texts/messages";
import { StrokeService } from "game/xstate/services";
import { getToTheEdge, rideTheEdge } from "./edge";

export function deny(denied: () => void) {
  return getToTheEdge(async () => {
    await rideTheEdge();

    StrokeService.pause();
    playCommand(getRandomAudioVariation("Denied"));
    createNotification({ message: getRandomDeniedMessage() });

    function finishedTrigger() {
      return denied();
    }
    finishedTrigger.label = "Denied";

    return [finishedTrigger];
  });
}
