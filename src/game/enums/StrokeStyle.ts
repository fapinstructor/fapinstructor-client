import store from "store";
import createNotification from "engine/createNotification";
import { getRandomInclusiveInteger } from "utils/math";

export const StrokeStyles = {
  dominant: {
    label: "Dominant",
  },
  nondominant: { label: "Nondominant" },
  headOnly: { label: "Head Only" },
  shaftOnly: { label: "Shaft Only" },
  overhandGrip: { label: "Overhand Grip" },
  bothHands: { label: "Both Hands" },
  handsOff: { label: "Hands Off" },
};

export type StrokeStyle = keyof typeof StrokeStyles;

/**
 * @deprecated Only used for backwards compatability since we store int on backend
 */
export const StrokeStyleString: { [key: number]: StrokeStyle } = {
  0: "dominant",
  1: "nondominant",
  2: "headOnly",
  3: "shaftOnly",
  4: "overhandGrip",
  5: "bothHands",
  6: "handsOff",
};

export const setDefaultStrokeStyle = async () => {
  await setStrokeStyle(store.config.defaultStrokeStyle);
};

export async function setStrokeStyle(
  strokeStyle: StrokeStyle = "dominant",
  quiet = false
) {
  // If stroke style is the same, don't do anything
  if (store.game.strokeStyle === strokeStyle) {
    return;
  }
  store.game.strokeStyle = strokeStyle;

  // If quiet is set, don't show notification
  if (quiet) {
    return;
  }

  switch (strokeStyle) {
    case "dominant": {
      createNotification({ message: "Use your dominant hand" });
      break;
    }
    case "nondominant": {
      createNotification({ message: "Use your nondominant hand" });
      break;
    }
    case "headOnly": {
      createNotification({ message: "Stroke only the head" });
      break;
    }
    case "shaftOnly": {
      createNotification({ message: "Stroke only the shaft" });
      break;
    }
    case "overhandGrip": {
      createNotification({ message: "Stroke with the overhand grip" });
      break;
    }
    case "bothHands": {
      createNotification({ message: "Use both of your hands" });
      break;
    }
    case "handsOff": {
      break;
    }
  }
}

/**
 * Get a array with all active stroke styles.
 *
 * @returns {Array} ["dominant", "headOnly", ...]
 */
const getActiveStokeStyles = (exclude: StrokeStyle[] = []) => {
  const {
    dominant,
    nondominant,
    headOnly,
    shaftOnly,
    overhandGrip,
    bothHands,
    handsOff,
  } = store.config.tasks;

  const enabledStyles: StrokeStyle[] = Object.entries({
    dominant,
    nondominant,
    headOnly,
    shaftOnly,
    overhandGrip,
    bothHands,
    handsOff,
  })
    // filter out any disabled stroke styles
    .filter(([key, value]) => value === true)
    // convert object to list of StrokeStyle keys
    .map(([key, value]) => key as StrokeStyle)
    // exclude any specified styles
    .filter((strokeStyle) => exclude.includes(strokeStyle));

  return enabledStyles;
};

const getRandomStrokeStyle = (exclude: StrokeStyle[] = []) => {
  const strokeStyles = getActiveStokeStyles();
  const randomStyleIndex = getRandomInclusiveInteger(
    0,
    strokeStyles.length - 1
  );
  const randomStyle = strokeStyles[randomStyleIndex];

  return randomStyle;
};

export const setRandomStrokeStyle = async (quiet = false) => {
  const strokeStyle = getRandomStrokeStyle();
  setStrokeStyle(strokeStyle, quiet);
};

export const setRandomOneHandedStrokeStyle = async () => {
  const strokeStyle = getRandomStrokeStyle(["bothHands", "handsOff"]);
  setStrokeStyle(strokeStyle);
};

export const getCurrentStrokeStyle = () => {
  return store.game?.strokeStyle;
};

// Added for backwards compatability, wraps setStrokeStyle
export const setStrokeStyleBothHands = () => setStrokeStyle("bothHands");
export const setStrokeStyleDominant = () => setStrokeStyle("dominant");
export const setStrokeStyleHeadOnly = () => setStrokeStyle("headOnly");
export const setStrokeStyleNondominant = () => setStrokeStyle("nondominant");
export const setStrokeStyleOverhandGrip = () => setStrokeStyle("overhandGrip");
export const setStrokeStyleShaftOnly = () => setStrokeStyle("shaftOnly");
export const setStrokeStyleHandsOff = () => setStrokeStyle("handsOff");
