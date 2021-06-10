import { TaskConfig } from "configureStore";
import createProbability from "./utils/createProbability";
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

export function initializeActions(taskConfigs: TaskConfig) {
  const enabledActions = [
    // speed
    taskConfigs.halvedStrokes && createProbability(halvedStrokes, 5),
    taskConfigs.doubleStrokes && createProbability(doubleStrokes, 15),
    taskConfigs.teasingStrokes && createProbability(teasingStrokes, 5),
    taskConfigs.randomBeat && createProbability(randomBeat, 5),
    taskConfigs.randomStrokeSpeed && createProbability(randomStrokeSpeed, 20),
    taskConfigs.accelerationCycles && createProbability(acceleration, 7),
    taskConfigs.redLightGreenLight && createProbability(redLightGreenLight, 7),
    taskConfigs.clusterStrokes && createProbability(clusterStrokes, 7),
    taskConfigs.handsOff && createProbability(handsOff, 5),
    taskConfigs.gripChallenge && createProbability(gripChallenge, 7),
    // cbt
    taskConfigs.rubberBands && createProbability(addRubberBand, 2),
    taskConfigs.rubberBands && createProbability(removeRubberBand, 1),
    taskConfigs.icyHot && createProbability(applyIcyHot, 1),
    taskConfigs.toothpaste && createProbability(applyToothpaste, 1),
    taskConfigs.ballSlaps && createProbability(ballslaps, 4),
    taskConfigs.squeezeBalls && createProbability(squeezeBalls, 4),
    taskConfigs.headPalming && createProbability(headPalming, 1),
    taskConfigs.bindCockBalls && createProbability(bindCockAndBalls, 1),
    taskConfigs.rubberBands && createProbability(snapRubberBand, 1),
    taskConfigs.breathPlay && createProbability(holdBreath, 1),
    taskConfigs.scratching && createProbability(scratchChest, 1),
    taskConfigs.scratching && createProbability(scratchThighs, 1),
    taskConfigs.scratching && createProbability(scratchShoulders, 1),
    taskConfigs.flicking && createProbability(flickCockHead, 1),
    taskConfigs.flicking && createProbability(flickNipples, 1),
    taskConfigs.cbtIce && createProbability(rubIceOnBalls, 1),
    // stroke style
    taskConfigs.dominant && createProbability(setStrokeStyleDominant, 15),
    taskConfigs.nondominant && createProbability(setStrokeStyleNondominant, 5),
    taskConfigs.headOnly && createProbability(setStrokeStyleHeadOnly, 1),
    taskConfigs.shaftOnly && createProbability(setStrokeStyleShaftOnly, 2),
    taskConfigs.overhandGrip &&
      createProbability(setStrokeStyleOverhandGrip, 1),
    taskConfigs.bothHands && createProbability(setStrokeStyleBothHands, 5),
    // anal
    taskConfigs.buttplug && createProbability(insertButtPlug, 2),
    taskConfigs.buttplug && createProbability(removeButtPlug, 1),
    // cei
    taskConfigs.precum && createProbability(eatPrecum, 3),
    // nipples
    taskConfigs.clothespins && createProbability(addClothespin, 3),
    taskConfigs.clothespins && createProbability(removeClothespin, 1),
    taskConfigs.rubNipples && createProbability(rubNipples, 5),
    taskConfigs.nipplesAndStroke && createProbability(nipplesAndStroke, 10),
  ].filter((action) => Boolean(action));

  // If an action has a probablity > 1, we duplicate it to give
  // const actionsWithProbabilitiesApplied = []

  // enabledActions.forEach(action => {
  //  action.probability
  // });

  // return actionsWithProbabilitiesApplied

  return enabledActions;
}

// [a, b, c, d]
// [1, 2, 1, 3]
// [a, b, b, c, d, d, d]
// rand 0 - 7
