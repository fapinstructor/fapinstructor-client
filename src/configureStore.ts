import store from "store";
import { StrokeStyle } from "game/enums/StrokeStyle";
import { GripStrength } from "game/xstate/machines/gripMachine";

const speedTasksConfig = {
  doubleStrokes: true,
  halvedStrokes: true,
  teasingStrokes: true,
  accelerationCycles: false,
  randomBeat: false,
  randomStrokeSpeed: false,
  redLightGreenLight: false,
  clusterStrokes: false,
  gripChallenge: false,
};
export type SpeedTasks = keyof typeof speedTasksConfig;
export const speedTasks = Object.keys(speedTasksConfig) as SpeedTasks[];

const strokeStyleTasksConfig = {
  dominant: true,
  nondominant: false,
  headOnly: false,
  shaftOnly: false,
  overhandGrip: false,
  bothHands: false,
  handsOff: false,
  gripAdjustments: true,
};
export type StrokeStyleTasks = keyof typeof strokeStyleTasksConfig;
export const strokeStyleTasks = Object.keys(
  strokeStyleTasksConfig
) as StrokeStyleTasks[];

const cbtTasksConfig = {
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
  clothespins: false,
};
export type CbtTasks = keyof typeof cbtTasksConfig;
export const cbtTasks = Object.keys(cbtTasksConfig) as CbtTasks[];

const ceiTasksConfig = {
  precum: false,
};
export type CeiTasks = keyof typeof ceiTasksConfig;
export const ceiTasks = Object.keys(ceiTasksConfig) as CeiTasks[];

const analTasksConfig = {
  buttplug: false,
};
export type AnalTasks = keyof typeof analTasksConfig;
export const analTasks = Object.keys(analTasksConfig) as AnalTasks[];

const nippleTasksConfig = {
  rubNipples: false,
  nipplesAndStroke: false,
};
export type NippleTasks = keyof typeof nippleTasksConfig;
export const nippleTasks = Object.keys(nippleTasksConfig) as NippleTasks[];

export type Task =
  | SpeedTasks
  | StrokeStyleTasks
  | CbtTasks
  | CeiTasks
  | AnalTasks
  | NippleTasks;

export const tasks: Task[] = [
  ...speedTasks,
  ...strokeStyleTasks,
  ...cbtTasks,
  ...ceiTasks,
  ...analTasks,
  ...nippleTasks,
];

const tasksConfig = {
  ...speedTasksConfig,
  ...strokeStyleTasksConfig,
  ...cbtTasksConfig,
  ...ceiTasksConfig,
  ...analTasksConfig,
  ...nippleTasksConfig,
};

export type TaskConfig = typeof tasksConfig;

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
  minimumOrgasms: number;
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

export const defaultConfig: GameConfig = Object.freeze({
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
  minimumOrgasms: 1,
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
  fastestStrokeSpeed: 4, // sec
  initialGripStrength: GripStrength.Normal,
  defaultStrokeStyle: "dominant",
  actionFrequency: 30, // sec
  tasks: tasksConfig,
});

export default function configureStore() {
  store.config = { ...defaultConfig };
  return store;
}
