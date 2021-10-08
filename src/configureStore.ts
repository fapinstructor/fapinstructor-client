import store from "store";
import { StrokeStyle } from "game/enums/StrokeStyle";
import { GripStrength } from "game/xstate/machines/gripMachine";
import { MediaType } from "common/types/Media";

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
  subreddits: string[];
  slideDuration: number;
  imageType: MediaType[];
  gameDuration: {
    min: number;
    max: number;
  };
  finaleProbabilities: {
    orgasm: number;
    denied: number;
    ruined: number;
  };
  postOrgasmTorture: boolean;
  postOrgasmTortureDuration: {
    min: number;
    max: number;
  };
  ruinedOrgasms: {
    min: number;
    max: number;
  };
  edgeCooldown: number;
  ruinCooldown: number;
  minimumEdges: number;
  edgeFrequency: number;
  strokeSpeed: {
    min: number;
    max: number;
  };
  orgasms: {
    min: number;
    max: number;
  };
  initialGripStrength: GripStrength;
  defaultStrokeStyle: StrokeStyle;
  actionFrequency: number;
  tasks: TaskConfig;
};

const defaultConfig: GameConfig = {
  subreddits: [
    "gonewild",
    "nsfw",
    "realgirls",
    "nsfw_gif",
    "cumsluts",
    "petitegonewild",
    "holdthemoan",
    "anal",
    "creampies",
  ],
  slideDuration: 10, // sec
  imageType: [MediaType.Picture, MediaType.Gif, MediaType.Video],
  gameDuration: {
    min: 5, // min
    max: 15, // min
  },
  finaleProbabilities: {
    orgasm: 100,
    denied: 0,
    ruined: 0,
  },
  postOrgasmTorture: false,
  postOrgasmTortureDuration: {
    min: 10, // sec
    max: 90, // sec
  },
  ruinedOrgasms: {
    min: 0,
    max: 0,
  },
  edgeCooldown: 10, // sec
  edgeFrequency: 0, // percent
  ruinCooldown: 20, // sec
  minimumEdges: 0,
  strokeSpeed: {
    min: 0.25, // per sec
    max: 4, // per sec
  },
  orgasms: {
    min: 1,
    max: 1,
  },
  initialGripStrength: GripStrength.Normal,
  defaultStrokeStyle: "dominant",
  actionFrequency: 30, // sec
  tasks: tasksConfig,
};

export default function configureStore() {
  store.config = { ...defaultConfig };
  return store;
}
