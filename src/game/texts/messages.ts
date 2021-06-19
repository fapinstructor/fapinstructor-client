import { getRandomInclusiveInteger } from "../../utils/math";

export const getRandomMessage = (messageArray: string[]) => {
  return messageArray[getRandomInclusiveInteger(0, messageArray.length - 1)];
};

/* ########################################### //
                    EDGES
// ########################################### */
export const getRandomEdgeMessage = () => {
  return getRandomMessage(edgeMessages);
};

const edgeMessages = [
  "Edge! I know you can do it.",
  "Get to the edge for me",
  "Edge! Show me how much you love working that cock for me",
  "Edge.",
  "Edge...",
  "Edge!",
  "Get on the edge.",
  "Edge for me.",
  "I want you to Edge.",
  "Edge for me!",
  "Give me that Edge!",
  "I want to see you Edge!",
  "Edge, baby.",
  "Edge, baby!",
  "Time to Edge!",
  "Time to Edge.",
  "Edge! Give it to me!",
];

/* ########################################### //
                       RUIN
// ########################################### */
export const getRandomRuinOrgasmMessage = () => {
  return getRandomMessage(ruinOrgasmMessages);
};

const ruinOrgasmMessages = [
  "RUIN IT! That's right, no full orgasms for you!",
  "Ruin it, slave. Let it drip helplessly, as you kiss your satisfaction goodbye.",
  "RUIN! NOW! Don't you cheat me on that one, slave. I'm watching you!",
  "Ruin it, baby. Aww, look at it leaking out. So sad, baby... so sad...",
];

/* ########################################### //
                       DENIED
// ########################################### */
export const getRandomDeniedMessage = () => {
  return getRandomMessage(deniedMessages);
};

const deniedMessages = [
  "Hands off! No cumming for you today, slave!",
  "Aaaand, Stop. Too bad, baby, this is not a happy ending day for you... Put your aching cock away now.",
  "STOP! No cumming for you, boy-toy! Too bad, so sad... Ahahaha.",
];

/* ########################################### //
                 Hands Off - REST
// ########################################### */
export const getRandomHandsOffMessage = () => {
  return getRandomMessage(handsOffMessages);
};

const handsOffMessages = [
  "Let go of your cock.",
  "Hands off!",
  "Hands off your cock.",
  "Take your hands away of your cock!",
  "Don't you dare touching your cock!",
  "Hands off now, baby.",
  "Relax. You may rest just a bit.",
  "Let go. A few moments to rest for you ...",
];
