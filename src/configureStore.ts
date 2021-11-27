import store from "@/store";
import { StrokeStyle } from "@/game/enums/StrokeStyle";
import { GripStrength } from "@/game/xstate/machines/gripMachine";
import { MediaType } from "@/types/Media";

const speedTasks = [
  "doubleStrokes",
  "halvedStrokes",
  "teasingStrokes",
  "accelerationCycles",
  "randomBeat",
  "randomStrokeSpeed",
  "redLightGreenLight",
  "clusterStrokes",
  "gripChallenge",
] as const;

export const strokeStyleTasks = [
  "dominant",
  "nondominant",
  "headOnly",
  "shaftOnly",
  "overhandGrip",
  "bothHands",
  "handsOff",
] as const;

const cbtTasks = [
  "bindCockBalls",
  "rubberBands",
  "ballSlaps",
  "squeezeBalls",
  "headPalming",
  "icyHot",
  "toothpaste",
  "breathPlay",
  "scratching",
  "flicking",
  "cbtIce",
  "clothespins",
] as const;

const ceiTasks = ["precum"] as const;

const analTasks = ["buttplug"] as const;

const nippleTasks = ["rubNipples", "nipplesAndStroke"] as const;

export const tasks = [
  speedTasks,
  strokeStyleTasks,
  cbtTasks,
  ceiTasks,
  analTasks,
  nippleTasks,
].flat();

export type SpeedTasks = typeof speedTasks[number];
export type StrokeStyleTasks = typeof strokeStyleTasks[number];
export type CbtTasks = typeof cbtTasks[number];
export type CeiTasks = typeof ceiTasks[number];
export type AnalTasks = typeof analTasks[number];
export type NippleTasks = typeof nippleTasks[number];

export type Task =
  | SpeedTasks
  | StrokeStyleTasks
  | CbtTasks
  | CeiTasks
  | AnalTasks
  | NippleTasks;

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
  gripAdjustments: boolean;
  initialGripStrength: GripStrength;
  defaultStrokeStyle: StrokeStyle;
  actionFrequency: number;
  tasks: Task[];
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
  gripAdjustments: true,
  initialGripStrength: GripStrength.Normal,
  defaultStrokeStyle: "dominant",
  actionFrequency: 30, // sec
  tasks: ["doubleStrokes", "halvedStrokes", "teasingStrokes", "dominant"],
};

export default function configureStore() {
  store.config = { ...defaultConfig };
  return store;
}
