import play from "engine/audio";
import { getRandomAudioVariation } from "audio";
import { getRandomInclusiveInteger } from "utils/math";
import type { GameLoopArgs } from "engine/loop";
import { selectEnableMoans } from "common/store/settings";
import store from "common/store";

let lastMoan = 0;
let moanDelay = 20;

const moanLoop = ({ progress }: GameLoopArgs) => {
  const enableMoans = selectEnableMoans(store.getState());
  if (enableMoans) {
    if (lastMoan > moanDelay * 1000) {
      play(getRandomAudioVariation("Moan"));
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
