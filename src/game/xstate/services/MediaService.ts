import { interpret, InterpreterFrom } from "xstate";
import { useService } from "@xstate/react";
import { GameConfig } from "configureStore";
import {
  createMediaMachine,
  MediaMachine,
} from "game/xstate/machines/mediaMachine";

let machine: MediaMachine;
let service: InterpreterFrom<MediaMachine>;

export function getMediaService() {
  if (!service) {
    throw new Error("You must first initialize the media service");
  }
  return service;
}

const MediaService = {
  initialize(gameConfig: GameConfig) {
    if (service) {
      service.stop();
    }

    machine = createMediaMachine(gameConfig);
    service = interpret(machine);

    // Automatically start the service after it's created
    service.start();
  },
  stop() {
    getMediaService().send("STOP");
  },
  get stopped() {
    return getMediaService().state.matches("stopped");
  },
  previousLink() {
    getMediaService().send("PREVIOUS_LINK");
  },
  nextLink() {
    getMediaService().send("NEXT_LINK");
  },
  pause() {
    getMediaService().send("PAUSE");
  },
  play() {
    getMediaService().send("PLAY");
  },
  get paused() {
    return getMediaService().state.value === "paused";
  },
};

export function useMediaService() {
  return useService(getMediaService());
}

export default MediaService;
