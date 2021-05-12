import { interpret, InterpreterFrom } from "xstate";
import { useService } from "@xstate/react";
import { GameConfig } from "configureStore";
import {
  createStrokeMachine,
  StrokeMachine,
} from "game/xstate/machines/strokeMachine";

type StrokeService = InterpreterFrom<StrokeMachine>;

let machine: StrokeMachine;
let service: StrokeService;

export function getStrokeService() {
  if (!service) {
    throw new Error("You must first initialize the stroke service");
  }
  return service;
}

function getStrokeServiceContext() {
  return getStrokeService().state.context;
}

const StrokeService = {
  initialize(gameConfig: GameConfig) {
    if (service) {
      service.stop();
    }

    machine = createStrokeMachine(gameConfig);
    service = interpret(machine, { devTools: true }).onTransition((state) => {
      if (state.value !== state.history?.value) {
        console.log(`[StrokeService] Transition: ${state.value}`);
      }
      console.log("[StrokeService] Event:", state.event);
    });

    // Automatically start the service after it's created
    service.start();
  },
  pause() {
    getStrokeService().send("PAUSE");
  },
  play() {
    getStrokeService().send("PLAY");
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
};

export function useStrokeService() {
  return useService(getStrokeService());
}

export default StrokeService;