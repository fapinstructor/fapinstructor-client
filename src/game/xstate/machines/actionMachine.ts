import { assign, createMachine } from "xstate";

export type ActionMachine = ReturnType<typeof createActionMachine>;

export type Action = {
  (): Promise<Action | Action[] | void>;
  label?: string;
};

export type ActionMachineContext = {
  triggers: Action[] | null;
};

export type ExecuteActionEvent = {
  type: "EXECUTE";
};

export type SetTiggersActionEvent = {
  type: "SET_TRIGGERS";
  triggers: Action[];
};

export type ActionMachineEvent =
  | { type: "DONE" }
  | ExecuteActionEvent
  | SetTiggersActionEvent;

function createActionMachine() {
  const actionMachine = createMachine<ActionMachineContext, ActionMachineEvent>(
    {
      id: "action",
      initial: "idle",
      context: {
        triggers: null,
      },
      on: {
        SET_TRIGGERS: {
          actions: "setTriggers",
        },
      },
      states: {
        idle: {
          on: {
            EXECUTE: {
              target: "executing",
              actions: "clearTriggers",
            },
          },
        },
        executing: {
          on: {
            DONE: {
              target: "idle",
            },
          },
        },
      },
    },
    {
      actions: {
        setTriggers: assign((context, event) => ({
          triggers: (event as SetTiggersActionEvent).triggers,
        })),
        clearTriggers: assign((context, event) => ({
          triggers: null,
        })),
      },
    }
  );

  return actionMachine;
}

export { createActionMachine };
