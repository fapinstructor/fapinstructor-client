import { interpret, InterpreterFrom } from "xstate";
import { useService } from "@xstate/react";
import { GameConfig } from "configureStore";
import { createObservable } from "utils/observable";
import {
  createStrokeMachine,
  StrokeMachine,
  StrokeMachineEvent,
} from "game/xstate/machines/strokeMachine";
import GripService from "./GripService";

let machine: StrokeMachine;
let service: InterpreterFrom<StrokeMachine>;

export function getStrokeService() {
  if (!service) {
    throw new Error("You must first initialize the stroke service");
  }
  return service;
}

function getStrokeServiceContext() {
  return getStrokeService().state.context;
}

export const strokeServiceObserver = createObservable<StrokeMachineEvent>();

const StrokeService = {
  initialize(gameConfig: GameConfig) {
    if (service) {
      service.stop();
    }
    machine = createStrokeMachine(gameConfig);
    service = interpret(machine).onEvent((event) => {
      strokeServiceObserver.notify(event as StrokeMachineEvent);
    });

    // Automatically start the service after it's created
    service.start();
  },
  stop() {
    getStrokeService().send("STOP");
  },
  get stopped() {
    return getStrokeService().state.matches("stopped");
  },
  get instance() {
    return getStrokeService();
  },
  pause() {
    getStrokeService().send("PAUSE");
    GripService.pause();
  },
  play() {
    getStrokeService().send("PLAY");
    GripService.play();
  },
  get paused() {
    return getStrokeService().state.value === "paused";
  },
  setStrokeSpeed(speed: number) {
    getStrokeService().send("SET_STROKE_SPEED", { speed });
  },
  setStrokeSpeedBaseline(speed: number) {
    getStrokeService().send("SET_STROKE_SPEED_BASELINE", { speed });
  },
  get strokeSpeed() {
    return getStrokeServiceContext().strokeSpeed;
  },
  get strokeSpeedBaseline() {
    return getStrokeServiceContext().strokeSpeedBaseline;
  },
  clearStrokeQueue() {
    getStrokeService().send("CLEAR_STROKE_QUEUE");
  },
};

export function useStrokeService() {
  return useService(getStrokeService());
}

export default StrokeService;
