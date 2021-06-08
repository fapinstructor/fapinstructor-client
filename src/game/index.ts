/**
 * The entry point to kick start and configure the game
 */
import { gameLoopObservable } from "engine/loop";
import interrupt from "engine/interrupt";
import { createAudioContext } from "engine/audio";
import configureStore from "./configureStore";
import actionLoop from "./loops/actionLoop";
import moanLoop from "./loops/moanLoop";
import {
  strokeSpeedBaseLineAdjustmentLoop,
  strokeSpeedAdjustmentLoop,
  gripAdjustmentLoop,
} from "./loops/strokeSpeedLoop";
import store from "store";
import {
  MediaService,
  StrokeService,
  ActionService,
  GripService,
} from "game/xstate/services";
import handy from "api/handy";

const loops = [
  actionLoop,
  moanLoop,
  strokeSpeedAdjustmentLoop,
  strokeSpeedBaseLineAdjustmentLoop,
  gripAdjustmentLoop,
];

const observers: number[] = [];

const startGame = async () => {
  await createAudioContext();
  configureStore();

  // Start services
  MediaService.initialize(store.config);
  GripService.initialize(store.config);
  StrokeService.initialize(store.config);
  ActionService.initialize();

  loops.forEach((loop) => {
    loop.reset();

    const id = gameLoopObservable.subscribe(loop);
    observers.push(id);
  });

  return true;
};

const stopGame = () => {
  interrupt();
  handy.setMode(0);

  observers.forEach((id) => {
    gameLoopObservable.unsubscribe(id);
  });
};

export { startGame, stopGame };
