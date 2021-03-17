import store from "store";
import moment, { unitOfTime } from "moment";

export default function elapsedGameTime(unit: unitOfTime.Diff) {
  return moment().diff(store.game.startTime, unit);
}
