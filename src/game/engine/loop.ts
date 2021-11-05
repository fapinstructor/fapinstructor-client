/**
 * The game loop will automatically start when this file is imported
 */
import { createObservable } from "@/utils/observable";
import visibilityChange from "@/utils/visibility";

let visible = true;

visibilityChange((visibility: boolean) => {
  visible = visibility;
  if (!visible) {
    setTimeout(() => update(window.performance.now()), 0);
  }
});

export type GameLoopArgs = {
  timestamp: number;
  progress: number;
};

export const gameLoopObservable = createObservable<GameLoopArgs>();

let lastRender = 0;

const update = (timestamp: number) => {
  gameLoopObservable.notify({ timestamp, progress: timestamp - lastRender });

  lastRender = timestamp;

  if (visible) {
    requestAnimationFrame(update);
  } else {
    setTimeout(() => update(window.performance.now()), 0);
  }
};

update(window.performance.now());
