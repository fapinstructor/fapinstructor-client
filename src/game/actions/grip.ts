import { clamp, getRandomBoolean } from "utils/math";
import { StrokeService } from "game/xstate/services";
import { GripStrength } from "game/xstate/machines/strokeMachine";

export const setDefaultGrip = () => {
  StrokeService.resetGripStrength();
};

export const setGrip = (grip: GripStrength) => {
  StrokeService.setGripStrength(
    clamp(grip, GripStrength.BarelyTouching, GripStrength.DeathGrip)
  );
};

export const setDeathGrip = () => {
  StrokeService.setGripStrength(GripStrength.DeathGrip);
};

export const setBarelyTouching = () => {
  StrokeService.setGripStrength(GripStrength.BarelyTouching);
};

export default function randomGripAdjustment() {
  getRandomBoolean()
    ? StrokeService.tightenGripStrength()
    : StrokeService.loosenGripStrength();
}
randomGripAdjustment.label = "Random Grip Adjustment";
