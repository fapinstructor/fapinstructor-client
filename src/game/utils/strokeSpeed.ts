import store from "store";
import { clamp, getRandomArbitrary } from "utils/math";
import { StrokeService } from "game/xstate/services";

/**
 * Generates a random stroke speed
 * We use the slowest & fastest stroke speeds:
 *  - reduce the fastest (faster) and increase the slowest. (slower)
 *  - ensure it stays in the allowed config range.
 *  - and then randomize it.
 *
 * @since 08.07.2018
 * @author thefapinstructor
 *
 * @param   {Number}  slow  - The slowest stroke speed.
 * @param   {Number}  fast  - the fastest stroke speed.
 *
 * @returns {Number} A random stroke speed.
 */
export const getRandomStrokeSpeed = ({ slow = 2, fast = 1.4 } = {}) => {
  const { slowestStrokeSpeed, fastestStrokeSpeed } = store.config;

  const slowestAdjustedSpeed =
    slow > 0 ? slowestStrokeSpeed * slow : slowestStrokeSpeed;
  const fastestAdjustedSpeed =
    fast > 0 ? fastestStrokeSpeed / fast : fastestStrokeSpeed;

  const minStrokeSpeed = clamp(
    slowestAdjustedSpeed,
    slowestStrokeSpeed,
    fastestStrokeSpeed
  );
  const maxStrokeSpeed = clamp(
    fastestAdjustedSpeed,
    slowestStrokeSpeed,
    fastestStrokeSpeed
  );

  return getRandomArbitrary(minStrokeSpeed, maxStrokeSpeed);
};

export const setStrokeSpeed = (newSpeed: number) => {
  const { slowestStrokeSpeed, fastestStrokeSpeed } = store.config;

  let speed = 0;

  if (newSpeed > 0) {
    speed = clamp(newSpeed, slowestStrokeSpeed, fastestStrokeSpeed);
  }

  StrokeService.setStrokeSpeed(speed);
};

export const getAverageStrokeSpeed = () =>
  (store.config.fastestStrokeSpeed + store.config.slowestStrokeSpeed) / 2;
