import store from "store";
import elapsedGameTime from "game/utils/elapsedGameTime";
import { clamp, getRandomBoolean } from "utils/math";
import { setStrokeSpeed } from "game/utils/strokeSpeed";
import type { GameLoopArgs } from "engine/loop";
import randomGripAdjustment from "game/actions/grip";
import { StrokeService, ActionService } from "game/xstate/services";

const BASELINE_ADJUSTMENT_FREQUENCY_SEC = 60;
let lastBaselineAdjustment = 0;

function calculateBaselineStrokeSpeed() {
  let baseline =
    (store.config.fastestStrokeSpeed / store.config.maximumGameTime) *
    elapsedGameTime("minutes");

  // Don't allow the baseline to go over the fastest stroking speed
  baseline = clamp(baseline, 0, store.config.fastestStrokeSpeed);

  return baseline;
}

/**
 * Slowly increase the baseline of the stroking speed.  When making
 * stroke speed adjustments, it will trend towards this value overtime.
 */
export function strokeSpeedBaseLineAdjustmentLoop({ progress }: GameLoopArgs) {
  if (lastBaselineAdjustment >= BASELINE_ADJUSTMENT_FREQUENCY_SEC * 1000) {
    StrokeService.setStrokeSpeedBaseline(calculateBaselineStrokeSpeed());

    lastBaselineAdjustment = 0;
  } else {
    lastBaselineAdjustment += progress;
  }
}

strokeSpeedBaseLineAdjustmentLoop.reset = () => {
  lastBaselineAdjustment = 0;
};

const STROKE_SPEED_ADJUSTMENT_FREQ_SEC = 10;
let lastStrokeSpeedAdjustment = 0;
export function strokeSpeedAdjustmentLoop({ progress }: GameLoopArgs) {
  // Don't do stroke speed adjustments if a task is being executed

  if (!ActionService.executing && !ActionService.triggers) {
    if (lastStrokeSpeedAdjustment >= STROKE_SPEED_ADJUSTMENT_FREQ_SEC * 1000) {
      const probabilityAdjustment =
        (StrokeService.strokeSpeedBaseline - StrokeService.strokeSpeed) /
        store.config.fastestStrokeSpeed;
      const weight = 0.5 * (1 + probabilityAdjustment);
      const shouldDecreaseSpeed = getRandomBoolean(weight);

      // Adjust speed by 10% in either direction
      const strokeSpeed =
        StrokeService.strokeSpeed * (shouldDecreaseSpeed ? 0.9 : 1.1);

      setStrokeSpeed(strokeSpeed);

      lastStrokeSpeedAdjustment = 0;
    } else {
      lastStrokeSpeedAdjustment += progress;
    }
  }
}
strokeSpeedAdjustmentLoop.reset = () => {
  lastStrokeSpeedAdjustment = 0;
};

const GRIP_ADJUSTMENT_FREQ_SEC = 30;
let lastGripAdjustment = 0;
export function gripAdjustmentLoop({ progress }: GameLoopArgs) {
  if (store.config.tasks.gripAdjustments) {
    if (!ActionService.executing && !ActionService.triggers) {
      if (lastGripAdjustment > GRIP_ADJUSTMENT_FREQ_SEC * 1000) {
        randomGripAdjustment();
        lastGripAdjustment = 0;
      } else {
        lastGripAdjustment += progress;
      }
    }
  }
}
gripAdjustmentLoop.reset = () => {
  lastGripAdjustment = 0;
};
