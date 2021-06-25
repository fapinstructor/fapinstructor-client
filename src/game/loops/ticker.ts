import { strokeEmitterObservable } from "./strokeEmitter";
import type { GameLoopArgs } from "engine/loop";
import { TIME_TO_TICK } from "components/organisms/BeatMeter/settings";
import { playTick } from "engine/audio";
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
let lastStrokeSpeed = 0;

const ticker = ({ timestamp }: GameLoopArgs) => {
  if (nextStrokeTime === 0) {
    nextStrokeTime = strokeQueue.shift() || 0;
  }

  if (nextStrokeTime > 0 && timestamp - TIME_TO_TICK >= nextStrokeTime) {
    nextStrokeTime = 0;

    // Only make api call when stroke speed changes
    if (StrokeService.strokeSpeed !== lastStrokeSpeed) {
      lastStrokeSpeed = StrokeService.strokeSpeed;
    }

    const enableTicks = selectEnableTicks(store.getState());
    if (enableTicks) {
      playTick(StrokeService.strokeSpeed);
    }
  }
};

ticker.reset = () => {
  nextStrokeTime = 0;
};

export default ticker;
