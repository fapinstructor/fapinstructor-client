import { createMachine, assign } from "xstate";
import { GameConfig } from "configureStore";
import { getRandomStrokeSpeed } from "game/utils/strokeSpeed";

export type StrokeMachine = ReturnType<typeof createStrokeMachine>;

export type StrokeMachineContext = {
  strokeSpeed: number;
  strokeSpeedBaseline: number;
};

type SetStrokeSpeedBaselineEvent = {
  type: "SET_STROKE_SPEED_BASELINE";
  speed: number;
};

type SetStrokeSpeedEvent = {
  type: "SET_STROKE_SPEED";
  speed: number;
};

export type StrokeMachineEvent =
  | { type: "PAUSE" }
  | { type: "PLAY" }
  | SetStrokeSpeedEvent
  | SetStrokeSpeedBaselineEvent;

function createStrokeMachine(config: GameConfig) {
  const initialStrokeSpeed = getRandomStrokeSpeed({ fast: 2 });

  const strokeMachine = createMachine<StrokeMachineContext, StrokeMachineEvent>(
    {
      id: "stroke",
      initial: "playing",
      context: {
        strokeSpeed: initialStrokeSpeed,
        strokeSpeedBaseline: 0,
      },
      states: {
        paused: {
          on: {
            PLAY: "playing",
          },
        },
        playing: {
          on: {
            PAUSE: "paused",
            SET_STROKE_SPEED: {
              actions: "setStrokeSpeed",
            },
            SET_STROKE_SPEED_BASELINE: {
              actions: "setStrokeSpeedBaseline",
            },
          },
        },
      },
    },
    {
      actions: {
        setStrokeSpeed: assign((context, event) => ({
          strokeSpeed: (event as SetStrokeSpeedEvent).speed,
        })),
        setStrokeSpeedBaseline: assign((context, event) => ({
          strokeSpeedBaseline: (event as SetStrokeSpeedBaselineEvent).speed,
        })),
      },
    }
  );

  return strokeMachine;
}

export { createStrokeMachine };
