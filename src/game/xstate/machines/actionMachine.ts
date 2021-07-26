import { GameConfig } from "configureStore";
import { assign, createMachine, send, actions } from "xstate";
import history from "browserHistory";
import store from "store";
import { TIME_TO_TICK } from "components/organisms/BeatMeter/settings";
import warmup from "game/actions/warmup";
import { playCommand } from "engine/audio";
import audioLibrary from "audio";
import interrupt from "engine/interrupt";
import delay from "utils/delay";
import { gameCompletionPercent } from "game/utils/elapsedGameTime";
import { getRandomItem } from "utils/math";
import { initializeActions } from "game/initializeActions";
import { stopServices } from "game";

import { edge } from "game/actions/orgasm/edge";
import { ruin, finalRuin } from "game/actions/orgasm/ruin";
import { orgasm, finalOrgasm } from "game/actions/orgasm/orgasm";
import { deny } from "game/actions/orgasm/deny";
import { startStrokingAgain } from "game/actions";
import applyProbabilities from "utils/applyProbabilities";

const { choose } = actions;

export type ActionMachine = ReturnType<typeof createActionMachine>;

function completed() {
  stopServices();
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
              playCommand(audioLibrary.StartGame);
              playCommand(audioLibrary.CardShuffle);
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
                    config: {
                      allowedProbability,
                      deniedProbability,
                      ruinedProbability,
                    },
                  } = store;

                  const outcomes = applyProbabilities([
                    [finalOrgasm, allowedProbability],
                    [finalRuin, ruinedProbability],
                    [deny, deniedProbability],
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
                    await delay(TIME_TO_TICK);
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
          const {
            game: { ruins, edges, orgasms },
            config: { minimumRuinedOrgasms, minimumEdges, minimumOrgasms },
          } = store;

          // Game shouldn't end until minimums are met.
          if (
            ruins < minimumRuinedOrgasms ||
            edges < minimumEdges ||
            // The end game can cause an orgasm, so subtract to flow through to that logic.
            orgasms < minimumOrgasms - 1
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
          const {
            game: { orgasms },
            config: { maximumOrgasms },
          } = store;

          // Leave one orgasm available for when the game ends.
          const remainingOrgasms = maximumOrgasms - (orgasms + 1);

          if (remainingOrgasms <= 0 || gameCompletionPercent() < 0.5) {
            return false;
          }

          // Use the time complexity of n^4 to calculate probability.
          return gameCompletionPercent() ** 4 > Math.random();
        },
        shouldRuin: () => {
          const {
            game: { ruins },
            config: { maximumRuinedOrgasms },
          } = store;

          if (ruins >= maximumRuinedOrgasms || gameCompletionPercent() < 0.5) {
            return false;
          }

          // Use the time complexity of n^2 (quadratic) to calculate probability.
          return gameCompletionPercent() ** 2 > Math.random();
        },
        shouldEdge: () => {
          const {
            config: { edgeFrequency },
          } = store;

          if (gameCompletionPercent() < 0.4) {
            return false;
          }

          // Use the time complexity of n (linear) to calculate probability.
          return gameCompletionPercent() + edgeFrequency / 100 > Math.random();
        },
      },
    }
  );

  return actionMachine;
}
