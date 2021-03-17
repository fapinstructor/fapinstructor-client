import store from "store";
import generateAction from "../actions/generateAction";
import executeAction from "engine/executeAction";
import play from "engine/audio";
import audioLibrary from "audio";
import warmup from "../actions/warmup";
import type { GameLoopArgs } from "engine/loop";

let lastGeneratedAction = -5000;
let playedStartAudio = false;

const actionLoop = ({ progress }: GameLoopArgs) => {
  const {
    config: { actionFrequency },
    localStorage: { enableVoice },
  } = store;
  if (!playedStartAudio) {
    playedStartAudio = true;
    executeAction(warmup);

    if (enableVoice) {
      play(audioLibrary.StartGame);
      play(audioLibrary.CardShuffle);
    }
  }

  if (lastGeneratedAction >= actionFrequency * 1000) {
    const { executing, actionTriggers } = store.engine;

    // Don't execute new actions if a command is already executing or if any triggers are awaiting
    if (!executing && !actionTriggers) {
      const action = generateAction.next();

      if (action && action.value && !action.done) {
        executeAction(action.value);
      }
    }
    lastGeneratedAction = 0;
  } else {
    lastGeneratedAction += progress;
  }
};

actionLoop.reset = () => {
  lastGeneratedAction = -5000;
  playedStartAudio = false;
};

export default actionLoop;
