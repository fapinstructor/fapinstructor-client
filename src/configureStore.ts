import store from "store";
import { GripStrengthEnum } from "game/enums/GripStrength";
import { StrokeStyleEnum } from "./game/enums/StrokeStyle";

/**
 * A big enum containing all setup information of the game.
 *
 * @since 03.08.2018
 */
const defaultConfig = {
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
  advancedEdging: true,
  advancedOrgasm: true,
  edgeCooldown: 10, // sec
  edgeFrequency: 0, // percent
  ruinCooldown: 20, // sec
  slowestStrokeSpeed: 0.25, // sec
  fastestStrokeSpeed: 5, // sec
  initialGripStrength: GripStrengthEnum.Normal,
  defaultStrokeStyle: StrokeStyleEnum.dominant,
  actionFrequency: 20, // sec
  tasks: {
    //Stroke Speed
    doubleStrokes: true,
    halvedStrokes: true,
    teasingStrokes: true,
    accelerationCycles: true,
    randomBeat: true,
    randomStrokeSpeed: true,
    redLightGreenLight: true,
    clusterStrokes: true,
    gripChallenge: true,
    //Stroke Style
    dominant: true,
    nondominant: true,
    headOnly: false,
    shaftOnly: false,
    overhandGrip: false,
    bothHands: true,
    handsOff: true,
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
    //Misc
    pickYourPoison: false,
  },
};

export type GameConfig = typeof defaultConfig;

export default () => {
  store.config = defaultConfig;
  return store;
};
