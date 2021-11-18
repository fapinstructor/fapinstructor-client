/**
 * The entry point to kick start and configure the game
 */

import { gameLoopObservable } from "@/game/engine/loop";
import interrupt from "@/game/engine/interrupt";
import { createAudioContext } from "@/game/engine/audio";
import store from "@/store";
import {
  MediaService,
  StrokeService,
  ActionService,
  GripService,
} from "@/game/xstate/services";
import { handy } from "@/features/handy";

import {
  strokeSpeedBaseLineAdjustmentLoop,
  strokeSpeedAdjustmentLoop,
  gripAdjustmentLoop,
} from "./loops/strokeSpeedLoop";
import moanLoop from "./loops/moanLoop";
import configureStore from "./configureStore";

const loops = [
  moanLoop,
  strokeSpeedAdjustmentLoop,
  strokeSpeedBaseLineAdjustmentLoop,
  gripAdjustmentLoop,
];

const observers: number[] = [];

export async function startServices() {
  if (handy.connected) {
    handy.reset();
  }

  await createAudioContext();
  configureStore();

  // Start services
  MediaService.initialize(store.config);
  GripService.initialize(store.config);
  StrokeService.initialize(store.config);
  ActionService.initialize(store.config);

  loops.forEach((loop) => {
    loop.reset();

    const id = gameLoopObservable.subscribe(loop);
    observers.push(id);
  });
}

export function stopServices() {
  interrupt();

  if (handy.connected) {
    handy.reset();
  }

  // Stop services
  MediaService.stop();
  GripService.stop();
  StrokeService.stop();
  ActionService.stop();

  observers.forEach((id) => {
    gameLoopObservable.unsubscribe(id);
  });
}
