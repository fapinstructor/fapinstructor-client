import { interpret, InterpreterFrom } from "xstate";
import {
  createActionMachine,
  ActionMachine,
  Action,
} from "game/xstate/machines/actionMachine";
import { useService } from "@xstate/react";
import { GameConfig } from "configureStore";

let machine: ActionMachine;
let service: InterpreterFrom<ActionMachine>;

export function getActionService() {
  if (!service) {
    throw new Error("You must first initialize the action service");
  }
  return service;
}

function getActionServiceContext() {
  return getActionService().state.context;
}

const ActionService = {
  initialize(gameConfig: GameConfig) {
    if (service) {
      service.stop();
    }

    machine = createActionMachine(gameConfig);
    service = interpret(machine, { devTools: true }).onTransition((state) => {
      if (state.value !== state.history?.value) {
        console.log(`[ActionService] Transition: ${state.value}`);
      }
      console.log("[ActionService] Event:", state.event);
    });

    // Automatically start the service after it's created
    service.start();
  },
  stop() {
    getActionService().send("STOP");
  },
  get stopped() {
    return !service || service.state.matches("stopped");
  },
  /**
   * Executes the specified action
   *
   * +----------------------------------+
   * |      Supports the following      |
   * +----------------------------------+
   * | -action executed immediately     |
   * | -action is executed on trigger   |
   * | -execution completes instantly   |
   * | -execution completes overtime    |
   * | -actions can be interrupted      |
   * +----------------------------------+
   * @param {A function that returns null or a promise} action
   * @param {If an action is already executing, should it be interrupted} shouldInterrupt
   */
  execute(action: Action, shouldInterrupt?: boolean) {
    getActionService().send({ type: "EXECUTE", action, shouldInterrupt });
  },
  setTriggers(triggers: Action[]) {
    getActionService().send("SET_TRIGGERS", { triggers });
  },
  get triggers() {
    return getActionServiceContext().triggers;
  },
  get executing() {
    return getActionService().state.matches("executing");
  },
};

export function useActionService() {
  return useService(getActionService());
}

export default ActionService;
