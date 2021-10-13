import store from "store";
import { createNotification } from "engine/notification";
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

const getActiveStokeStyles = () => {
  const enabledStyles = store.config.tasks.filter((task) =>
    Object.keys(StrokeStyles).includes(task)
  );

  return enabledStyles;
};

// TODO: Exclude bothHands and handsOff because some tasks require both hands because some tasks require both hands.
const getRandomStrokeStyle = () => {
  const strokeStyles = getActiveStokeStyles();
  const randomStyleIndex = getRandomInclusiveInteger(
    0,
    strokeStyles.length - 1
  );
  const randomStyle = strokeStyles[randomStyleIndex] as StrokeStyle;

  return randomStyle;
};

export const setRandomOneHandedStrokeStyle = async () => {
  const strokeStyle = getRandomStrokeStyle();
  setStrokeStyle(strokeStyle);
};

export const getCurrentStrokeStyle = () => {
  return store.game?.strokeStyle;
};
