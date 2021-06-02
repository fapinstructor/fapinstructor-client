import { createMachine, assign, send } from "xstate";
import { GameConfig } from "configureStore";
import { getRandomStrokeSpeed } from "game/utils/strokeSpeed";
import createNotification from "engine/createNotification";
import audioLibrary from "audio";
import { playCommand } from "engine/audio";

export enum GripStrength {
  BarelyTouching,
  VeryLight,
  Light,
  Normal,
  Tight,
  VeryTight,
  DeathGrip,
}

export const GripStrengthString: { [key in GripStrength]: string } = {
  [GripStrength.BarelyTouching]: "barely touching",
  [GripStrength.VeryLight]: "very light",
  [GripStrength.Light]: "light",
  [GripStrength.Normal]: "normal",
  [GripStrength.Tight]: "tight",
  [GripStrength.VeryTight]: "very tight",
  [GripStrength.DeathGrip]: "death grip",
};

export type StrokeMachine = ReturnType<typeof createStrokeMachine>;

export type StrokeMachineContext = {
  strokeSpeed: number;
  strokeSpeedBaseline: number;
  gripStrength: GripStrength;
};

type SetStrokeSpeedBaselineEvent = {
  type: "SET_STROKE_SPEED_BASELINE";
  speed: number;
};

type SetStrokeSpeedEvent = {
  type: "SET_STROKE_SPEED";
  speed: number;
};

type SetGripStrengthEvent = {
  type: "SET_GRIP_STRENGTH";
  strength: GripStrength;
};

export type StrokeMachineEvent =
  | { type: "PAUSE" }
  | { type: "PLAY" }
  | SetStrokeSpeedEvent
  | SetStrokeSpeedBaselineEvent
  | SetGripStrengthEvent
  | { type: "RESET_GRIP_STRENGTH" }
  | { type: "LOOSEN_GRIP_STRENGTH" }
  | { type: "TIGHTEN_GRIP_STRENGTH" }
  | { type: "SET_LOOSEST_GRIP_STRENGTH" }
  | { type: "SET_TIGHTEST_GRIP_STRENGTH" };

export function createStrokeMachine(config: GameConfig) {
  const initialStrokeSpeed = getRandomStrokeSpeed({ fast: 2 });

  const strokeMachine = createMachine<StrokeMachineContext, StrokeMachineEvent>(
    {
      id: "stroke",
      initial: "playing",
      context: {
        strokeSpeed: initialStrokeSpeed,
        strokeSpeedBaseline: 0,
        gripStrength: config.initialGripStrength,
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
            SET_GRIP_STRENGTH: {
              cond: "isNotSameGripStrength",
              actions: ["setGripStrengh", "showGripNotification"],
            },
            RESET_GRIP_STRENGTH: {
              actions: send({
                type: "SET_GRIP_STRENGTH",
                strength: config.initialGripStrength,
              }),
            },
            SET_LOOSEST_GRIP_STRENGTH: {
              actions: send({
                type: "SET_GRIP_STRENGTH",
                strength: GripStrength.BarelyTouching,
              }),
            },
            SET_TIGHTEST_GRIP_STRENGTH: {
              actions: send({
                type: "SET_GRIP_STRENGTH",
                strength: GripStrength.DeathGrip,
              }),
            },
            LOOSEN_GRIP_STRENGTH: {
              cond: "canLoosenGripStrength",
              actions: [
                "loosenGripStrength",
                ({ gripStrength }) =>
                  createNotification({
                    message: `Loosen your grip so it's ${
                      GripStrengthString[(gripStrength - 1) as GripStrength]
                    }`,
                  }),
              ],
            },
            TIGHTEN_GRIP_STRENGTH: {
              cond: "canTightenGripStrength",
              actions: [
                "tightenGripStrength",
                ({ gripStrength }) =>
                  createNotification({
                    message: `Tighten your grip so it's ${
                      GripStrengthString[(gripStrength + 1) as GripStrength]
                    }`,
                  }),
              ],
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
        setGripStrength: assign((context, event) => ({
          gripStrength: (event as SetGripStrengthEvent).strength,
        })),
        loosenGripStrength: assign(({ gripStrength }, event) => ({
          gripStrength: gripStrength - 1,
        })),
        tightenGripStrength: assign(({ gripStrength }, event) => ({
          gripStrength: gripStrength + 1,
        })),
        showGripNotification: (context, event) => {
          switch (event.type) {
            case "SET_LOOSEST_GRIP_STRENGTH": {
              createNotification({
                message: "Loosen your grip until you barely feel it",
              });
              break;
            }
            case "SET_TIGHTEST_GRIP_STRENGTH": {
              playCommand(audioLibrary.Tighter);
              createNotification({
                message: "Tighten your grip until it hurts",
              });
              break;
            }
            case "SET_GRIP_STRENGTH": {
              const gripStrength = (event as SetGripStrengthEvent).strength;

              createNotification({
                message: `Change your grip so it's ${GripStrengthString[gripStrength]}`,
              });
            }
          }
        },
      },
      guards: {
        isNotSameGripStrength: ({ gripStrength }, event) => {
          console.log("isNotSameGripStrength", {
            gripStrength,
            eventStrength: (event as SetGripStrengthEvent).strength,
          });
          return gripStrength !== (event as SetGripStrengthEvent).strength;
        },
        canTightenGripStrength: ({ gripStrength }) => {
          return gripStrength !== GripStrength.DeathGrip;
        },
        canLoosenGripStrength: ({ gripStrength }) => {
          return gripStrength !== GripStrength.BarelyTouching;
        },
      },
    }
  );

  return strokeMachine;
}
