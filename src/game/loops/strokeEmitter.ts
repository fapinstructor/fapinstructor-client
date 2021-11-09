import type { GameLoopArgs } from "@/game/engine/loop";
import { createObservable } from "@/utils/observable";
import { StrokeService } from "@/game/xstate/services";


type EmissionEvent = {
  type: "emit";
  strokeTime: number;
};

type ClearEvent = {
  type: "clear";
};

export type StrokeEvent = EmissionEvent | ClearEvent;

export const strokeEmitterObservable = createObservable<StrokeEvent>();

export type StrokeEmitterObservable = typeof strokeEmitterObservable;

const NoteFraction = {
  Whole: 1,
  Half: 0.5,
  Quarter: 0.25,
  Eight: 0.125,
  Sixteenth: 0.0625,
};

type Note = ["Note" | "Rest", keyof typeof NoteFraction];

const measure: Note[] = [["Note", "Whole"]];
// const measure: Note[] = [
//   ["Note", "Eight"],
//   ["Note", "Eight"],
//   ["Note", "Quarter"],
//   ["Note", "Eight"],
//   ["Note", "Eight"],
//   ["Note", "Quarter"],
//   ["Note", "Eight"],
//   ["Note", "Eight"],
//   ["Note", "Eight"],
//   ["Note", "Eight"],
//   ["Note", "Half"],
// ];

let lastRender = 0;
let measureIndex = 0;
let noteDuration = 0;

const strokeEmitter = ({ timestamp, progress }: GameLoopArgs) => {
  if (!StrokeService.paused) {
    lastRender += progress;

    const tempo = 60 * StrokeService.strokeSpeed;
    const wholeNoteDuration = 60 / tempo;
    const sixteenthNoteDuration = wholeNoteDuration * NoteFraction.Sixteenth;

    if (lastRender >= sixteenthNoteDuration * 1000) {
      lastRender = 0;

      const [noteKind, noteFraction] = measure[measureIndex];

      if (noteDuration <= 0) {
        if (noteKind === "Note") {
          strokeEmitterObservable.notify({
            type: "emit",
            strokeTime: timestamp,
          });
        }

        // Iterate through the measure
        if (++measureIndex === measure.length) {
          measureIndex = 0;
        }

        noteDuration = wholeNoteDuration * NoteFraction[noteFraction];
      } else {
        noteDuration -= sixteenthNoteDuration;
      }
    }
  }
};

strokeEmitter.reset = () => {
  lastRender = 0;
  measureIndex = 0;
  noteDuration = 0;
};

export function clearStrokeEmissions() {
  strokeEmitterObservable.notify({
    type: "clear",
  });
}

export default strokeEmitter;
