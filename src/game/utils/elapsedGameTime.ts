import store from "store";
import moment, { unitOfTime } from "moment";

export function gameCompletionPercent() {
  return elapsedGameTime("minutes") / store.config.maximumGameTime;
}

export default function elapsedGameTime(unit: unitOfTime.Diff) {
  return moment().diff(store.game.startTime, unit);
}
