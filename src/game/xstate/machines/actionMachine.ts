import { GameConfig } from "configureStore";
import { assign, createMachine, send } from "xstate";
import { TIME_DELAY } from "components/organisms/BeatMeter/settings";
import warmup from "game/actions/warmup";
import { playCommand } from "engine/audio";
import audioLibrary from "audio";
import interrupt from "engine/interrupt";
import createIntervalMachine from "./intervalMachine";
import generateAction from "game/actions/generateAction";
import delay from "utils/delay";

export type ActionMachine = ReturnType<typeof createActionMachine>;

export type Action = {
  (): Promise<Action | Action[] | void>;
  label?: string;
};

export type ActionMachineContext = {
  triggers: Action[];
};

type GenerateActionEvent = {
  type: "GENERATE_ACTION";
};

export type ExecuteActionEvent = {
  type: "EXECUTE";
  action: Action;
  shouldInterrupt?: boolean;
};

export type SetTiggersActionEvent = {
  type: "SET_TRIGGERS";
  triggers: Action[];
};

export type ActionMachineEvent =
  | ExecuteActionEvent
  | SetTiggersActionEvent
  | GenerateActionEvent;

export function createActionMachine(config: GameConfig) {
  const actionFrequency = config.actionFrequency;

  const actionMachine = createMachine<ActionMachineContext, ActionMachineEvent>(
    {
      id: "action",
      initial: "warmup",
      context: {
        triggers: [],
      },
      on: {
        SET_TRIGGERS: {
          actions: "setTriggers",
        },
      },
      states: {
        warmup: {
          always: {
            target: "idle",
            actions: [
              send({ type: "EXECUTE", action: warmup }),
              () => {
                playCommand(audioLibrary.StartGame);
                playCommand(audioLibrary.CardShuffle);
              },
            ],
          },
        },
        idle: {
          invoke: {
            id: "generateActionInterval",
            src: createIntervalMachine({ callback: "GENERATE_ACTION" }),
            data: {
              interval: actionFrequency * 1000,
            },
          },
          on: {
            GENERATE_ACTION: {
              cond: "canGenerateAction",
              actions: "generateAction",
            },
            EXECUTE: {
              target: "executing",
            },
          },
        },
        executing: {
          entry: "clearTriggers",
          invoke: {
            id: "executeAction",
            src: (context, event) => async (callback) => {
              try {
                const { action, shouldInterrupt = false } =
                  event as ExecuteActionEvent;

                if (shouldInterrupt) {
                  interrupt();
                }

                const trigger = await action();

                if (trigger) {
                  const triggers = Array.isArray(trigger) ? trigger : [trigger];

                  await delay(TIME_DELAY / 2);

                  callback({ type: "SET_TRIGGERS", triggers });
                }
              } catch (error) {
                if (error.reason !== "interrupt") {
                  console.error(error);
                }
              }
            },
            onDone: {
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
          triggers: [],
        })),
        generateAction: send(() => {
          const action = generateAction.next();

          return { type: "EXECUTE", action: action.value };
        }),
      },
      guards: {
        canGenerateAction: (context) => context.triggers.length === 0,
      },
    }
  );

  return actionMachine;
}
