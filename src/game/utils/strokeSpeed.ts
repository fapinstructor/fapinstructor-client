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
  const {
    strokeSpeed: { min: slowestStrokeSpeed, max: fastestStrokeSpeed },
  } = store.config;

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
  let speed = 0;

  if (newSpeed > 0) {
    speed = clamp(
      newSpeed,
      store.config.strokeSpeed.min,
      store.config.strokeSpeed.max
    );
  }

  StrokeService.setStrokeSpeed(speed);
};

export const getAverageStrokeSpeed = () =>
  (store.config.strokeSpeed.max + store.config.strokeSpeed.min) / 2;
