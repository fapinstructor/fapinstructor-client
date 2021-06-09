import proxyStore from "store";
// import generateAction from "../actions/generateAction";
import type { GameLoopArgs } from "engine/loop";
import { ActionService } from "game/xstate/services";

let lastGeneratedAction = -5000;

const actionLoop = ({ progress }: GameLoopArgs) => {
  const {
    config: { actionFrequency },
  } = proxyStore;
  if (lastGeneratedAction >= actionFrequency * 1000) {
    // Don't execute new actions if a command is already executing or if any triggers are awaiting
    if (!ActionService.executing && !ActionService.triggers) {
      // const action = generateAction.next();
      // if (action && action.value && !action.done) {
      //   ActionService.execute(action.value);
      // }
    }
    lastGeneratedAction = 0;
  } else {
    lastGeneratedAction += progress;
  }
};

actionLoop.reset = () => {
  lastGeneratedAction = -5000;
};

export default actionLoop;
