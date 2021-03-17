/**
 * {{0: barely, 1: slightly, 2: " ", 3: gentle, 4: intensively}}
 */
export const RubStrengthString = {
  0: "barely ",
  1: "slightly ",
  2: " ",
  3: "gentle ",
  4: "intensively ",
};
/**
 * {{Barely: 0, Slightly: 1, Normally: 2, Gentle: 3, Intensively: 4}}
 */
export const RubStrengthEnum = {
  Barely: 0,
  Slightly: 1,
  Normally: 2,
  Gentle: 3,
  Intensively: 4,
};

export const RubStrengthStringArray = Object.entries(RubStrengthString);

export const RubStrengthArray = Object.entries(RubStrengthEnum);

/**
 * Chooses a random Strength from all available
 * @returns {string}
 */
export const getRandomRubStrength = () => {
  return RubStrengthStringArray[
    Math.floor(Math.random() * RubStrengthStringArray.length)
  ][1];
};
