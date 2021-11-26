import type { GameLoopArgs } from "@/game/engine/loop";
import { getRandomInclusiveInteger } from "@/utils/math";
import { selectSettings } from "@/common/store/settings";
import store from "@/common/store";
import { playCommand } from "@/game/engine/audio";

let lastMoan = 0;
let moanDelay = 20;

const moanLoop = ({ progress }: GameLoopArgs) => {
  const settings = selectSettings(store.getState());
  if (settings.moans) {
    if (lastMoan > moanDelay * 1000) {
      playCommand("moan", { ignoreMute: true });
      lastMoan = 0;
      moanDelay = getRandomInclusiveInteger(5, 40);
    } else {
      lastMoan += progress;
    }
  }
};

moanLoop.reset = () => {
  lastMoan = 0;
  moanDelay = 20;
};

export default moanLoop;
