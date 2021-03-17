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

export const getRandomEdgeAndHoldMessage = () => {
  return getRandomMessage(edgeAndHoldMessages);
};

const edgeAndHoldMessages = [
  "Edge like this and hold.",
  "Edge like this and hold it.",
  "Edge like this! Then hold it!",
  "Edge like this and hold for me, baby.",
  "Edge like this and hold, baby.",
  "Edge like this and ride it, baby.",
  "Edge like this, and keep riding it.",
  "Edge like this. I want to see you hold it.",
  "Edge like this. I will make you hold it.",
  "Edge like this! I will make you ride it.",
  "Edge like this, then let me see you hold it.",
  "Edge like this, then hold.",
  "Edge just like this! You will hold it.",
  "Edge just like this and hold.",
  "Edge just like this and hold it.",
  "Edge just like this! Then hold it!",
  "Edge just like this and hold for me, baby.",
  "Edge just like this and hold, baby.",
  "Edge just like this and ride it, baby.",
  "Edge just like this, and keep riding it.",
  "Edge just like this. I want to see you hold it.",
  "Edge just like this. I will make you hold it.",
  "Edge just like this! I will make you ride it.",
  "Edge just like this, then let me see you hold it.",
  "Edge just like this, then hold.",
];

export const getRandomEdgeLadderMessage = () => {
  return getRandomMessage(edgeLadderMessages);
};

const edgeLadderMessages = [
  "We are going to play edge ladder. You'll have to climb it",
  "Edge ladder time for your poor cock",
  "Let's make you really happy! By climbing the edge ladder",
];

export const getRandomEdgeAdvancedMessage = () => {
  return getRandomMessage(edgeAdvancedMessages);
};

const edgeAdvancedMessages = [
  "Get to the edge at this pace and grip, if you can...",
  "Don't speed up, and don't change your grip, get to the edge",
];

export const getRandomEdgeInTimeMessage = () => {
  return getRandomMessage(edgeInTimeMessages);
};

const edgeInTimeMessages = [
  "Get to the edge now!",
  "I don't have much time for your dick today. Edge. Now!",
  "You want to get punished for not reaching the edge in time, don't you?",
  "Edge. Now.",
  "Edge. Now!",
  "Edge ... Now.",
];

/* ########################################### //
                   ORGASM
// ########################################### */
export const getRandomOrgasmMessage = () => {
  return getRandomMessage(orgasmMessages);
};

const orgasmMessages = [
  "You have permission to have a full orgasm",
  "Cum for me! This is your lucky day, slave! Enjoy your precious orgasm!",
  "CUM! That's right, baby! I allow it.",
  "Surprise! Full Orgasm for you! That's right, toy, enjoy it for me. Shoot every last drop of it.",
  "I decided to allow an orgasm for you today. Enjoy your reward!",
];

export const getRandomOrgasmAdvancedMessage = () => {
  return getRandomMessage(orgasmAdvancedMessages);
};

const orgasmAdvancedMessages = [
  "You have permission to have a full orgasm. But only if you keep stroking exactly the way you are stroking now!",
  "Take your time and keep on stroking until you cum",
  "You now may cum",
];

export const getRandomOrgasmInTimeMessage = () => {
  return getRandomMessage(orgasmInTimeMessages);
};

const orgasmInTimeMessages = [
  "Orgasm now!",
  "I don't have time for your worthless cock. Cum. Now!",
  "I don't have time for your worthless cock today. Cum. Now!",
  "You will get punished if you don't cum now!",
  "You will get punished if you don't cum right now!",
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

/* ########################################### //
                  Hurry Up
// ########################################### */
export const getRandomHurryUpMessage = () => {
  return getRandomMessage(hurryUpMessages);
};

const hurryUpMessages = [
  "tick ... tock ... tick ... tock ...",
  "Hurry up, I don't want to wait this time",
  "Hurry up!",
  "Do it fast!",
  "faster!",
];

/* ########################################### //
                   Questions 
// ########################################### */
export const getRandomDidYouCumMessage = () => {
  return getRandomMessage(didYouCumMessages);
};

const didYouCumMessages = [
  "Did you cum, my obedient little toy?",
  "Did you cum?",
  "Did you cum for your Mistress?",
  "Now, my little toy, tell me honestly: Did you cum?",
  "I demand you to tell me the truth: Did you manage to cum?",
];
