import type { TaskConfig } from "configureStore";
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
  ballslaps,
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
import { Action } from "./xstate/machines/actionMachine";

export function initializeActions(taskConfigs: TaskConfig) {
  const enabledActions: [Action, number][] = [
    [halvedStrokes, taskConfigs.halvedStrokes ? 5 : 0],
    [doubleStrokes, taskConfigs.doubleStrokes ? 15 : 0],
    [teasingStrokes, taskConfigs.teasingStrokes ? 5 : 0],
    [randomBeat, taskConfigs.randomBeat ? 5 : 0],
    [randomStrokeSpeed, taskConfigs.randomStrokeSpeed ? 20 : 0],
    [acceleration, taskConfigs.accelerationCycles ? 7 : 0],
    [redLightGreenLight, taskConfigs.redLightGreenLight ? 7 : 0],
    [clusterStrokes, taskConfigs.clusterStrokes ? 7 : 0],
    [handsOff, taskConfigs.handsOff ? 5 : 0],
    [gripChallenge, taskConfigs.gripChallenge ? 7 : 0],
    [addRubberBand, taskConfigs.rubberBands ? 2 : 0],
    [removeRubberBand, taskConfigs.rubberBands ? 1 : 0],
    [applyIcyHot, taskConfigs.icyHot ? 1 : 0],
    [applyToothpaste, taskConfigs.toothpaste ? 1 : 0],
    [ballslaps, taskConfigs.ballSlaps ? 4 : 0],
    [squeezeBalls, taskConfigs.squeezeBalls ? 4 : 0],
    [headPalming, taskConfigs.headPalming ? 1 : 0],
    [bindCockAndBalls, taskConfigs.bindCockBalls ? 1 : 0],
    [snapRubberBand, taskConfigs.rubberBands ? 1 : 0],
    [holdBreath, taskConfigs.breathPlay ? 1 : 0],
    [scratchChest, taskConfigs.scratching ? 1 : 0],
    [scratchThighs, taskConfigs.scratching ? 1 : 0],
    [scratchShoulders, taskConfigs.scratching ? 1 : 0],
    [flickCockHead, taskConfigs.flicking ? 1 : 0],
    [flickNipples, taskConfigs.flicking ? 1 : 0],
    [rubIceOnBalls, taskConfigs.cbtIce ? 1 : 0],
    [setStrokeStyleDominant, taskConfigs.dominant ? 15 : 0],
    [setStrokeStyleNondominant, taskConfigs.nondominant ? 5 : 0],
    [setStrokeStyleHeadOnly, taskConfigs.headOnly ? 1 : 0],
    [setStrokeStyleShaftOnly, taskConfigs.shaftOnly ? 2 : 0],
    [setStrokeStyleOverhandGrip, taskConfigs.overhandGrip ? 1 : 0],
    [setStrokeStyleBothHands, taskConfigs.bothHands ? 5 : 0],
    [insertButtPlug, taskConfigs.buttplug ? 2 : 0],
    [removeButtPlug, taskConfigs.buttplug ? 1 : 0],
    [eatPrecum, taskConfigs.precum ? 3 : 0],
    [addClothespin, taskConfigs.clothespins ? 3 : 0],
    [removeClothespin, taskConfigs.clothespins ? 1 : 0],
    [rubNipples, taskConfigs.rubNipples ? 5 : 0],
    [nipplesAndStroke, taskConfigs.nipplesAndStroke ? 10 : 0],
  ];

  const actionsWithProbabilitiesApplied = applyProbabilities(enabledActions);

  return actionsWithProbabilitiesApplied;
}

/**
 * If an action has a probablity > 1, we duplicate it to give it the appropriate proability
 * Example
 * [a, b, c, d]
 * [1, 2, 1, 3]
 * [a, b, b, c, d, d, d]
 */
function applyProbabilities<T>(probabilities: [T, number][]) {
  const appliedProbabilities: T[] = [];

  probabilities.forEach(([t, probability]) => {
    for (let i = 0; i < probability; i++) {
      appliedProbabilities.push(t);
    }
  });

  return appliedProbabilities;
}
