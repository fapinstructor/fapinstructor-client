import { interpret, InterpreterFrom } from "xstate";
import { useService } from "@xstate/react";
import { OldGameConfig } from "configureStore";
import {
  createGripMachine,
  GripStrength,
  GripMachine,
} from "game/xstate/machines/gripMachine";

let machine: GripMachine;
let service: InterpreterFrom<GripMachine>;

export function getGripService() {
  if (!service) {
    throw new Error("You must first initialize the grip service");
  }
  return service;
}

function getGripServiceContext() {
  return getGripService().state.context;
}

const GripService = {
  initialize(gameConfig: OldGameConfig) {
    if (service) {
      service.stop();
    }

    machine = createGripMachine(gameConfig);
    service = interpret(machine);

    // Automatically start the service after it's created
    service.start();
  },
  stop() {
    if (!this.stopped) {
      getGripService().send("STOP");
    }
  },
  get stopped() {
    return getGripService().state.matches("stopped");
  },
  pause() {
    getGripService().send("PAUSE");
  },
  play() {
    getGripService().send("PLAY");
  },
  get paused() {
    return getGripService().state.value === "paused";
  },
  setGripStrength(strength: GripStrength) {
    getGripService().send("SET_GRIP_STRENGTH", { strength });
  },
  resetGripStrength() {
    getGripService().send("RESET_GRIP_STRENGTH");
  },
  loosenGripStrength() {
    getGripService().send("LOOSEN_GRIP_STRENGTH");
  },
  tightenGripStrength() {
    getGripService().send("TIGHTEN_GRIP_STRENGTH");
  },
  get gripStrength() {
    return getGripServiceContext().gripStrength;
  },
};

export function useGripService() {
  return useService(getGripService());
}

export default GripService;
