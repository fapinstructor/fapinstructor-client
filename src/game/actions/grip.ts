import { getRandomBoolean } from "@/utils/math";
import { GripService } from "@/game/xstate/services";

export default function randomGripAdjustment() {
  getRandomBoolean()
    ? GripService.tightenGripStrength()
    : GripService.loosenGripStrength();
}
randomGripAdjustment.label = "Random Grip Adjustment";
