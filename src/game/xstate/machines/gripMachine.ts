import { createMachine, assign, send } from "xstate";

import { GameConfig } from "@/configureStore";
import { createNotification } from "@/game/engine/notification";
import { playCommand } from "@/game/engine/audio";

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
  [GripStrength.BarelyTouching]: "Barely touching",
  [GripStrength.VeryLight]: "Very light",
  [GripStrength.Light]: "Light",
  [GripStrength.Normal]: "Normal",
  [GripStrength.Tight]: "Tight",
  [GripStrength.VeryTight]: "Very tight",
  [GripStrength.DeathGrip]: "Death grip",
};

export type GripMachine = ReturnType<typeof createGripMachine>;

export type GripMachineContext = {
  gripStrength: GripStrength;
};

type SetGripStrengthEvent = {
  type: "SET_GRIP_STRENGTH";
  strength: GripStrength;
};

export type StopEvent = {
  type: "STOP";
};

export type GripMachineEvent =
  | { type: "PAUSE" }
  | { type: "PLAY" }
  | SetGripStrengthEvent
  | { type: "RESET_GRIP_STRENGTH" }
  | { type: "LOOSEN_GRIP_STRENGTH" }
  | { type: "TIGHTEN_GRIP_STRENGTH" }
  | { type: "SET_LOOSEST_GRIP_STRENGTH" }
  | { type: "SET_TIGHTEST_GRIP_STRENGTH" }
  | StopEvent;

export function createGripMachine(config: GameConfig) {
  const gripMachine = createMachine<GripMachineContext, GripMachineEvent>(
    {
      id: "grip",
      initial: "playing",
      context: {
        gripStrength: config.initialGripStrength,
      },
      on: {
        STOP: {
          target: "stopped",
        },
      },
      states: {
        stopped: {
          type: "final",
        },
        paused: {
          on: {
            PLAY: "playing",
          },
        },
        playing: {
          on: {
            SET_GRIP_STRENGTH: {
              cond: "isNotSameGripStrength",
              actions: ["setGripStrength", "showGripNotification"],
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
              playCommand("tighter");
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

  return gripMachine;
}
