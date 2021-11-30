import { assign, createMachine, send, actions } from "xstate";

import { GameConfig } from "@/configureStore";
import history from "@/browserHistory";
import store from "@/store";
import { TICK_DELAY } from "@/config";
import warmup from "@/game/actions/warmup";
import { playCommand } from "@/game/engine/audio";
import interrupt from "@/game/engine/interrupt";
import { delay } from "@/game/engine/delay";
import { gameCompletionPercent } from "@/game/utils/elapsedGameTime";
import { getRandomItem } from "@/utils/math";
import { initializeActions } from "@/game/initializeActions";
import { stopServices } from "@/game";
import { edge } from "@/game/actions/orgasm/edge";
import { ruin, finalRuin } from "@/game/actions/orgasm/ruin";
import { orgasm, finalOrgasm } from "@/game/actions/orgasm/orgasm";
import { deny } from "@/game/actions/orgasm/deny";
import { startStrokingAgain } from "@/game/actions";
import applyProbabilities from "@/utils/applyProbabilities";
import { isFullScreen, toggleFullScreen } from "@/game/utils/fullscreen";

const { choose } = actions;

export type ActionMachine = ReturnType<typeof createActionMachine>;

function completed() {
  stopServices();

  if (isFullScreen()) {
    toggleFullScreen();
  }
  history.push("/endgame");
}

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

export type SetTriggersActionEvent = {
  type: "SET_TRIGGERS";
  triggers: Action[];
};

export type StopEvent = {
  type: "STOP";
};

export type ActionMachineEvent =
  | ExecuteActionEvent
  | SetTriggersActionEvent
  | GenerateActionEvent
  | StopEvent;

export function createActionMachine(config: GameConfig) {
  const actionFrequency = config.actionFrequency;
  const actions = initializeActions(config.tasks);

  const getRandomAction = () => actions.length > 0 && getRandomItem(actions);

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
          actions: "interrupt",
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
              playCommand("startGame");
              playCommand("shuffle");
            },
          ],
        },
        idle: {
          entry: choose([
            {
              cond: "shouldEndGame",
              actions: send({
                type: "EXECUTE",
                action: () => {
                  const {
                    config: { finaleProbabilities },
                  } = store;

                  const outcomes = applyProbabilities([
                    [finalOrgasm, finaleProbabilities.orgasm],
                    [finalRuin, finaleProbabilities.ruined],
                    [deny, finaleProbabilities.denied],
                  ]);

                  const outcome = getRandomItem(outcomes);

                  return outcome(completed);
                },
              }),
            },
            {
              cond: "shouldOrgasm",
              actions: send({
                type: "EXECUTE",
                action: orgasm,
              }),
            },
            {
              cond: "shouldRuin",
              actions: send({
                type: "EXECUTE",
                action: () => ruin(startStrokingAgain),
              }),
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
          invoke: {
            id: "executeAction",
            src: (context, event) => async (callback) => {
              try {
                const { action, executeImmediately = false } =
                  event as ExecuteActionEvent;

                if (!action) {
                  return;
                }

                const trigger = await action();

                if (trigger) {
                  const triggers = Array.isArray(trigger) ? trigger : [trigger];

                  if (!executeImmediately) {
                    await delay(TICK_DELAY);
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
          // we probably want to wait within the idle.
          // The waiting for triggers should be a separate state.
          // Picking the next action should be a separate state
          after: {
            [actionFrequency * 1000]: {
              cond: "isFinishedExecuting",
              target: "idle",
            },
          },
          exit: "clearTriggers",
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
          triggers: (event as SetTriggersActionEvent).triggers,
        })),
        clearTriggers: assign((context, event) => ({
          triggers: [],
        })),
      },
      guards: {
        isFinishedExecuting: (context) => context.triggers.length === 0,
        shouldEndGame: () => {
          const { game, config } = store;

          // Game shouldn't end until minimums are met.
          if (
            game.ruins < config.ruinedOrgasms.min ||
            game.edges < config.minimumEdges ||
            // The end game can cause an orgasm, so subtract to flow through to that logic.
            game.orgasms < config.orgasms.min - 1
          ) {
            return false;
          }

          // Once minimums are met and if we are over the max time then end the game.
          if (gameCompletionPercent() >= 1) {
            return true;
          }

          // Use the time complexity of n^4 to calculate probability.
          return gameCompletionPercent() ** 4 > Math.random();
        },
        /**
         * This function is only used when multiple orgasms have been configured.
         */
        shouldOrgasm: () => {
          const { game, config } = store;

          // Leave one orgasm available for when the game ends.
          const remainingOrgasms = config.orgasms.max - (game.orgasms + 1);

          if (remainingOrgasms <= 0 || gameCompletionPercent() < 0.5) {
            return false;
          }

          // Use the time complexity of n^4 to calculate probability.
          return gameCompletionPercent() ** 4 > Math.random();
        },
        shouldRuin: () => {
          const { game, config } = store;

          if (
            game.ruins >= config.ruinedOrgasms.max ||
            gameCompletionPercent() < 0.5
          ) {
            return false;
          }

          // Use the time complexity of n^2 (quadratic) to calculate probability.
          return gameCompletionPercent() ** 2 > Math.random();
        },
        shouldEdge: () => {
          const {
            config: { edgeFrequency, minimumEdges },
            game: { edges },
          } = store;

          if (gameCompletionPercent() < 0.3) {
            return false;
          }

          let edgeProbability = edgeFrequency / 100;
          const remainingEdges = minimumEdges - edges;

          if (remainingEdges > 0) {
            // Increase the probability if there are remaining edges.
            edgeProbability += gameCompletionPercent() ** 3;
          }

          // Use the time complexity of n (linear) to calculate probability.
          return edgeProbability > Math.random();
        },
      },
    }
  );

  return actionMachine;
}
