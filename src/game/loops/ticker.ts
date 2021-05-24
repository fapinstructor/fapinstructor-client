import { strokeEmitterObservable } from "./strokeEmitter";
import type { GameLoopArgs } from "engine/loop";
import { TIME_DELAY } from "components/organisms/BeatMeter/settings";
import play, { playTick } from "engine/audio";
import audioLibrary from "audio";
import { StrokeService } from "game/xstate/services";
import { selectEnableTicks } from "common/store/settings";
import store from "common/store";

const strokeQueue: number[] = [];
strokeEmitterObservable.subscribe((event) => {
  switch (event.type) {
    case "clear":
      strokeQueue.splice(0, strokeQueue.length);
      break;
    case "emit":
      strokeQueue.push(event.strokeTime);
      break;
  }
});

let nextStrokeTime = 0;
const ticker = ({ timestamp }: GameLoopArgs) => {
  if (nextStrokeTime === 0) {
    nextStrokeTime = strokeQueue.shift() || 0;
  }

  if (nextStrokeTime > 0 && timestamp - TIME_DELAY / 2 >= nextStrokeTime) {
    nextStrokeTime = 0;

    const enableTicks = selectEnableTicks(store.getState());
    if (enableTicks) {
      if (!playTick(StrokeService.strokeSpeed)) {
        play(audioLibrary.Tick);
      }
    }
  }
};

ticker.reset = () => {
  nextStrokeTime = 0;
};

export default ticker;
