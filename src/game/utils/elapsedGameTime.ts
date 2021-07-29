import store from "store";
import differenceInMinutes from "date-fns/differenceInMinutes";

export function gameCompletionPercent() {
  return elapsedGameTime() / store.config.maximumGameTime;
}

export default function elapsedGameTime() {
  return differenceInMinutes(new Date(), new Date(store.game.startTime));
}
