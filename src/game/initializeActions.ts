import type { Task } from "configureStore";
import applyProbabilities from "utils/applyProbabilities";
import {
  doubleStrokes,
  halvedStrokes,
  teasingStrokes,
  randomStrokeSpeed,
  randomBeat,
  redLightGreenLight,
  clusterStrokes,
  acceleration,
  handsOff,
  gripChallenge,
  addRubberBand,
  removeRubberBand,
  snapRubberBand,
  applyIcyHot,
  applyToothpaste,
  ballSlaps,
  squeezeBalls,
  headPalming,
  bindCockAndBalls,
  holdBreath,
  scratchChest,
  scratchShoulders,
  scratchThighs,
  flickCockHead,
  rubIceOnBalls,
  addClothespin,
  removeClothespin,
  rubNipples,
  nipplesAndStroke,
  flickNipples,
  setStrokeStyleBothHands,
  setStrokeStyleDominant,
  setStrokeStyleHeadOnly,
  setStrokeStyleNondominant,
  setStrokeStyleOverhandGrip,
  setStrokeStyleShaftOnly,
  eatPrecum,
  insertButtPlug,
  removeButtPlug,
} from "./actions";
import type { Action } from "./xstate/machines/actionMachine";

type ActionProbabilityTuple = [Action, number];

type TaskActionMap = {
  [key in Task]: ActionProbabilityTuple | ActionProbabilityTuple[];
};

const taskActionProbabilityMap: TaskActionMap = {
  halvedStrokes: [halvedStrokes, 5],
  doubleStrokes: [doubleStrokes, 15],
  teasingStrokes: [teasingStrokes, 5],
  randomBeat: [randomBeat, 5],
  randomStrokeSpeed: [randomStrokeSpeed, 20],
  accelerationCycles: [acceleration, 7],
  redLightGreenLight: [redLightGreenLight, 7],
  clusterStrokes: [clusterStrokes, 7],
  handsOff: [handsOff, 5],
  gripChallenge: [gripChallenge, 7],
  rubberBands: [
    [addRubberBand, 2],
    [removeRubberBand, 1],
    [snapRubberBand, 1],
  ],
  icyHot: [applyIcyHot, 1],
  toothpaste: [applyToothpaste, 1],
  ballSlaps: [ballSlaps, 4],
  squeezeBalls: [squeezeBalls, 4],
  headPalming: [headPalming, 1],
  bindCockBalls: [bindCockAndBalls, 1],
  breathPlay: [holdBreath, 1],
  scratching: [
    [scratchChest, 1],
    [scratchThighs, 1],
    [scratchShoulders, 1],
  ],
  flicking: [
    [flickCockHead, 1],
    [flickNipples, 1],
  ],
  cbtIce: [rubIceOnBalls, 1],
  dominant: [setStrokeStyleDominant, 15],
  nondominant: [setStrokeStyleNondominant, 5],
  headOnly: [setStrokeStyleHeadOnly, 1],
  shaftOnly: [setStrokeStyleShaftOnly, 2],
  overhandGrip: [setStrokeStyleOverhandGrip, 1],
  bothHands: [setStrokeStyleBothHands, 5],
  buttplug: [
    [insertButtPlug, 2],
    [removeButtPlug, 1],
  ],
  precum: [eatPrecum, 3],
  clothespins: [
    [addClothespin, 3],
    [removeClothespin, 1],
  ],
  rubNipples: [rubNipples, 5],
  nipplesAndStroke: [nipplesAndStroke, 10],
};

export function initializeActions(tasks: Task[]) {
  const enabledActions = tasks.reduce<ActionProbabilityTuple[]>(
    (actions, task) => {
      const action = taskActionProbabilityMap[task];

      // A task can have multiple actions associated with it.  If it does, we flatten it.
      if (Array.isArray(action[0])) {
        return [...actions, ...action] as ActionProbabilityTuple[];
      }
      return [...actions, action] as ActionProbabilityTuple[];
    },
    []
  );

  return applyProbabilities(enabledActions);
}
