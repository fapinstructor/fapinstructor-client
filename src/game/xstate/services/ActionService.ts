import { interpret, InterpreterFrom } from "xstate";
import {
  createActionMachine,
  ActionMachine,
  Action,
} from "game/xstate/machines/actionMachine";
import { useService } from "@xstate/react";
import interrupt from "engine/interrupt";
import { TIME_DELAY } from "components/organisms/BeatMeter/settings";

type ActionService = InterpreterFrom<ActionMachine>;

let machine: ActionMachine;
let service: ActionService;

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
  initialize() {
    if (service) {
      service.stop();
    }

    machine = createActionMachine();
    service = interpret(machine, { devTools: true }).onTransition((state) => {
      if (state.value !== state.history?.value) {
        console.log(`[ActionService] Transition: ${state.value}`);
      }
      console.log("[ActionService] Event:", state.event);
    });

    // Automatically start the service after it's created
    service.start();
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
  execute(action: Action, shouldInterrupt = false) {
    if (shouldInterrupt) {
      interrupt();
    }

    getActionService().send("EXECUTE");

    return action()
      .then((trigger) => {
        if (trigger) {
          setTimeout(() => {
            const actionTriggers = Array.isArray(trigger) ? trigger : [trigger];
            ActionService.setTriggers(actionTriggers);
          }, TIME_DELAY / 2);
        }
        ActionService.done();

        // was interrupted?
        return false;
      })
      .catch((e) => {
        if (!e || e.reason !== "interrupt") {
          console.error(e);
        }
        // was interrupted?
        return true;
      });
  },
  setTriggers(triggers: Action[]) {
    getActionService().send("SET_TRIGGERS", { triggers });
  },
  done() {
    getActionService().send("DONE");
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
