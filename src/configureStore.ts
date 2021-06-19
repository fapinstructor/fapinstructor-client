import store from "store";
import { StrokeStyle } from "game/enums/StrokeStyle";
import { GripStrength } from "game/xstate/machines/gripMachine";

export type TaskConfig = {
  //Stroke Speed
  doubleStrokes: boolean;
  halvedStrokes: boolean;
  teasingStrokes: boolean;
  accelerationCycles: boolean;
  randomBeat: boolean;
  randomStrokeSpeed: boolean;
  redLightGreenLight: boolean;
  clusterStrokes: boolean;
  gripChallenge: boolean;
  //Stroke Style
  dominant: boolean;
  nondominant: boolean;
  headOnly: boolean;
  shaftOnly: boolean;
  overhandGrip: boolean;
  bothHands: boolean;
  handsOff: boolean;
  //Grip Strength
  gripAdjustments: boolean;
  //CBT
  bindCockBalls: boolean;
  rubberBands: boolean;
  ballSlaps: boolean;
  squeezeBalls: boolean;
  headPalming: boolean;
  icyHot: boolean;
  toothpaste: boolean;
  breathPlay: boolean;
  scratching: boolean;
  flicking: boolean;
  cbtIce: boolean;
  //CEI
  precum: boolean;
  //Anal
  buttplug: boolean;
  //Nipples
  rubNipples: boolean;
  clothespins: boolean;
  nipplesAndStroke: boolean;
};

export type GameConfig = {
  isDefaultConfig: boolean;
  redditId: string;
  gifs: boolean;
  pictures: boolean;
  videos: boolean;
  slideDuration: number; // sec
  finalOrgasmAllowed: boolean;
  allowedProbability: number; // percent
  finalOrgasmDenied: boolean;
  deniedProbability: number; // percent
  finalOrgasmRuined: boolean;
  ruinedProbability: number; // percent
  finalOrgasmRandom: boolean;
  minimumGameTime: number; // min
  maximumGameTime: number; // min
  minimumEdges: number;
  minimumRuinedOrgasms: number;
  maximumRuinedOrgasms: number;
  maximumOrgasms: number;
  postOrgasmTorture: boolean;
  postOrgasmTortureMinimumTime: number;
  postOrgasmTortureMaximumTime: number;
  edgeCooldown: number; // sec
  edgeFrequency: number; // percent
  ruinCooldown: number; // sec
  slowestStrokeSpeed: number; // sec
  fastestStrokeSpeed: number; // sec
  initialGripStrength: number;
  defaultStrokeStyle: StrokeStyle;
  actionFrequency: number; // sec
  tasks: TaskConfig;
};

/**
 * A big enum containing all setup information of the game.
 */
const defaultConfig: GameConfig = {
  isDefaultConfig: true,
  redditId:
    "NSFW_GIF, gonewild, nsfw, 60fpsporn, porninaminute, holdthemoan, cumsluts, realgirls, gwcouples, porninfifteenseconds, cuckold, hotwife, anal, blowjobs, bustypetite, ass, collegesluts, wifesharing, creampies, ruinedorgasms, chastitycouples, postorgasm",
  gifs: true,
  pictures: true,
  videos: true,
  slideDuration: 10, // sec
  finalOrgasmAllowed: true,
  allowedProbability: 100, // percent
  finalOrgasmDenied: false,
  deniedProbability: 0, // percent
  finalOrgasmRuined: false,
  ruinedProbability: 0, // percent
  finalOrgasmRandom: false,
  minimumGameTime: 5, // min
  maximumGameTime: 20, // min
  minimumEdges: 0,
  minimumRuinedOrgasms: 0,
  maximumRuinedOrgasms: 0,
  maximumOrgasms: 1,
  postOrgasmTorture: false,
  postOrgasmTortureMinimumTime: 10,
  postOrgasmTortureMaximumTime: 90,
  edgeCooldown: 10, // sec
  edgeFrequency: 0, // percent
  ruinCooldown: 20, // sec
  slowestStrokeSpeed: 0.25, // sec
  fastestStrokeSpeed: 5, // sec
  initialGripStrength: GripStrength.Normal,
  defaultStrokeStyle: "dominant",
  actionFrequency: 30, // sec
  tasks: {
    //Stroke Speed
    doubleStrokes: true,
    halvedStrokes: true,
    teasingStrokes: true,
    accelerationCycles: false,
    randomBeat: false,
    randomStrokeSpeed: false,
    redLightGreenLight: false,
    clusterStrokes: false,
    gripChallenge: false,
    //Stroke Style
    dominant: true,
    nondominant: false,
    headOnly: false,
    shaftOnly: false,
    overhandGrip: false,
    bothHands: false,
    handsOff: false,
    //Grip Strength
    gripAdjustments: true,
    //CBT
    bindCockBalls: false,
    rubberBands: false,
    ballSlaps: false,
    squeezeBalls: false,
    headPalming: false,
    icyHot: false,
    toothpaste: false,
    breathPlay: false,
    scratching: false,
    flicking: false,
    cbtIce: false,
    //CEI
    precum: false,
    //Anal
    buttplug: false,
    //Nipples
    rubNipples: false,
    clothespins: false,
    nipplesAndStroke: false,
  },
};

export default function configureStore() {
  store.config = defaultConfig;
  return store;
}
