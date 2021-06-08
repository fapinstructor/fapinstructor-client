import { assign, createMachine, sendParent } from "xstate";

export type IntervalMachineContext = {
  interval: number;
  progress: null | number;
};

export type SetIntervalEvent = { type: "SET_INTERVAL"; interval: number };
export type TickEvent = { type: "TICK"; timestamp: number };

export type IntervalMachineEvent = TickEvent | SetIntervalEvent;

export default function createIntervalMachine({
  callback,
}: {
  callback: string;
}) {
  const intervalMachine = createMachine<
    IntervalMachineContext,
    IntervalMachineEvent
  >(
    {
      initial: "ticking",
      type: "parallel",
      context: {
        interval: 0,
        progress: null,
      },
      invoke: {
        src: () => (cb) => {
          let frame: number;

          function step(timestamp: number) {
            cb({ type: "TICK", timestamp });
            frame = requestAnimationFrame(step);
          }
          frame = requestAnimationFrame(step);

          return () => cancelAnimationFrame(frame);
        },
      },
      on: {
        SET_INTERVAL: {
          actions: assign({
            interval: (context, event) => (event as SetIntervalEvent).interval,
          }),
        },
      },
      states: {
        ticking: {
          on: {
            TICK: {
              cond: "intervalElapsed",
              actions: [
                "setProgress",
                sendParent((context, event) => ({
                  type: callback,
                  timestamp: event.timestamp,
                })),
              ],
            },
          },
        },
      },
    },
    {
      actions: {
        setProgress: assign({
          progress: (context, event) => (event as TickEvent).timestamp,
        }),
      },
      guards: {
        intervalElapsed: (context, event) => {
          const elapsed =
            (event as TickEvent).timestamp - (context.progress ?? 0);

          return elapsed >= context.interval;
        },
      },
    }
  );

  return intervalMachine;
}
