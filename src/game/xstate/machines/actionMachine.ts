import { GameConfig } from "configureStore";
import { assign, createMachine, send, actions } from "xstate";
import store from "store";
import { TIME_DELAY } from "components/organisms/BeatMeter/settings";
import warmup from "game/actions/warmup";
import { playCommand } from "engine/audio";
import audioLibrary from "audio";
import interrupt from "engine/interrupt";
import delay from "utils/delay";
import elapsedGameTime from "game/utils/elapsedGameTime";
import { edge } from "game/actions/orgasm/edge";
import ruin from "game/actions/orgasm/ruin";
import { doOrgasm } from "game/actions/orgasm/orgasm";
import { StrokeService } from "../services";
import { getRandomInclusiveInteger } from "utils/math";
import { initializeActions } from "game/initializeActions";

const { choose } = actions;

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
  executeImmediately?: boolean;
};

export type SetTiggersActionEvent = {
  type: "SET_TRIGGERS";
  triggers: Action[];
};

export type StopEvent = {
  type: "STOP";
};

export type ActionMachineEvent =
  | ExecuteActionEvent
  | SetTiggersActionEvent
  | GenerateActionEvent
  | StopEvent;

export function createActionMachine(config: GameConfig) {
  const actionFrequency = config.actionFrequency;
  const actions = initializeActions(config.tasks);

  const getRandomAction = () =>
    actions[getRandomInclusiveInteger(0, actions.length - 1)];

  const actionMachine = createMachine<ActionMachineContext, ActionMachineEvent>(
    {
      id: "action",
      initial: "warmup",
      context: {
        triggers: [],
      },
      on: {
        STOP: {
          target: "stopped",
        },
        EXECUTE: {
          target: "executing",
        },
      },
      states: {
        stopped: {
          type: "final",
        },
        warmup: {
          entry: [
            send({
              type: "EXECUTE",
              action: warmup,
              executeImmediately: true,
            }),
            () => {
              playCommand(audioLibrary.StartGame);
              playCommand(audioLibrary.CardShuffle);
            },
          ],
        },
        idle: {
          entry: choose([
            {
              cond: "shouldOrgasm",
              actions: send({ type: "EXECUTE", action: doOrgasm }),
            },
            {
              cond: "shouldRuin",
              actions: send({ type: "EXECUTE", action: ruin }),
            },
            {
              cond: "shouldEdge",
              actions: send({ type: "EXECUTE", action: edge }),
            },
            {
              actions: send(() => ({
                type: "EXECUTE",
                action: getRandomAction(),
              })),
            },
          ]),
        },
        executing: {
          entry: "interrupt",
          invoke: {
            id: "executeAction",
            src: (context, event) => async (callback) => {
              try {
                const { action, executeImmediately = false } =
                  event as ExecuteActionEvent;

                const trigger = await action();

                if (trigger) {
                  const triggers = Array.isArray(trigger) ? trigger : [trigger];

                  if (!executeImmediately) {
                    await delay(TIME_DELAY / 2);
                  }

                  callback({ type: "SET_TRIGGERS", triggers });
                }
              } catch (error) {
                if (error.reason !== "interrupt") {
                  console.error(error);
                }
              }
            },
            onDone: {
              target: "executed",
            },
          },
          on: {
            SET_TRIGGERS: {
              actions: "setTriggers",
            },
          },
        },
        executed: {
          after: {
            [actionFrequency * 1000]: {
              cond: "isFinishedExecuting",
              target: "idle",
            },
          },
          exit: "clearTriggers",
          // on: {
          //   EXECUTE: {
          //     target: "executing",
          //     actions: "clearTriggers",
          //   },
          // },
        },
      },
    },
    {
      actions: {
        interrupt: () => {
          try {
            interrupt();
          } catch (error) {
            if (error.reason !== "interrupt") {
              console.error(error);
            }
          }
        },
        setTriggers: assign((context, event) => ({
          triggers: (event as SetTiggersActionEvent).triggers,
        })),
        clearTriggers: assign((context, event) => ({
          triggers: [],
        })),
      },
      guards: {
        isFinishedExecuting: (context) => context.triggers.length === 0,
        shouldOrgasm: () => {
          const {
            game: { ruins, edges },
            config: {
              minimumRuinedOrgasms,
              minimumEdges,
              minimumGameTime,
              maximumGameTime,
              actionFrequency,
            },
          } = store;

          const allowedChangeOfOrgasm =
            minimumRuinedOrgasms <= ruins &&
            minimumEdges <= edges &&
            elapsedGameTime("minutes") >= minimumGameTime;

          if (!allowedChangeOfOrgasm) {
            return false;
          }

          const gameCompletionPercent =
            elapsedGameTime("seconds") / (maximumGameTime * 60);

          // Probability Graph: https://www.desmos.com/calculator/xhyaj1gxuc
          // y = a^4
          return gameCompletionPercent ** 4 / actionFrequency > Math.random();
        },
        shouldRuin: (context) => {
          const {
            game: { ruins },
            config: {
              maximumRuinedOrgasms,
              minimumGameTime,
              maximumGameTime,
              actionFrequency,
              fastestStrokeSpeed,
            },
          } = store;

          const isAllowedChance =
            ruins < maximumRuinedOrgasms &&
            elapsedGameTime("minutes") >= minimumGameTime * 1.3 &&
            StrokeService.strokeSpeed >= fastestStrokeSpeed / 1.7;

          if (!isAllowedChance) {
            return false;
          }

          const gameCompletionPercent =
            elapsedGameTime("seconds") / (maximumGameTime * 60);

          // Probability Graph: https://www.desmos.com/calculator/xhyaj1gxuc
          // y = a^4
          return gameCompletionPercent ** 4 / actionFrequency > Math.random();
        },
        shouldEdge: () => {
          const {
            config: {
              minimumGameTime,
              maximumGameTime,
              actionFrequency,
              edgeFrequency,
            },
          } = store;

          const isAllowedChance =
            elapsedGameTime("minutes") >= minimumGameTime * 1.2;
          if (!isAllowedChance) {
            return false;
          }

          const gameCompletionPercent =
            elapsedGameTime("seconds") / (maximumGameTime * 60);

          // Probability Graph: https://www.desmos.com/calculator/atc32p8kof
          // y = a
          return (
            (gameCompletionPercent / actionFrequency) *
              (1 + edgeFrequency / 100) >
            Math.random()
          );
        },
      },
    }
  );

  return actionMachine;
}
