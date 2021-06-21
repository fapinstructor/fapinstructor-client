/**
 * Rounds a number to the provided number of decimal places.
 */
export const round = (value: number, decimals: number) => {
  return Number(Math.round(Number(value + "e" + decimals)) + "e-" + decimals);
};

/**
 * Returns a random integer between and including the specified min, max.
 */
export const getRandomInclusiveInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Returns a random item from an array
 */
export const getRandomItem = <T>(items: Array<T>) => {
  return items[Math.floor(Math.random() * items.length)];
};

/**
 * Returns true only at a percent percentage chance.
 *
 * @param percent
 *   the percentage of cases the function will evaluate to true.
 * @returns {boolean}
 *   in percent of all cases the function will return true.
 */
export const chance = (percent: number) => {
  return getRandomInclusiveInteger(1, 100) < percent;
};

/**
 * Returns a random boolean
 * @param weight Adjusts the randomness to favour either more false (negative)
 * or true (positive)
 */
export const getRandomBoolean = (weight = 0.5) => Math.random() >= weight;

/**
 * Returns a random number between the specified values.
 * The returned value is no lower than (and may possibly equal) min,
 * and is less than (and not equal) max
 */
export const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

/**
 * Clamps a number between the specified range.
 * @param {The number the operation takes place on} num
 * @param {The minimum value the result can be} min
 * @param {The maximum value the result can be} max
 */
export const clamp = (num: number, min: number, max: number) => {
  return Math.min(Math.max(num, min), max);
};
