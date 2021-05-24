import proxyStore from "store";
import generateAction from "../actions/generateAction";
import play from "engine/audio";
import audioLibrary from "audio";
import warmup from "../actions/warmup";
import type { GameLoopArgs } from "engine/loop";
import { ActionService } from "game/xstate/services";
import { selectEnableVoice } from "common/store/settings";
import store from "common/store";

let lastGeneratedAction = -5000;
let playedStartAudio = false;

const actionLoop = ({ progress }: GameLoopArgs) => {
  const {
    config: { actionFrequency },
  } = proxyStore;
  if (!playedStartAudio) {
    playedStartAudio = true;
    ActionService.execute(warmup);

    const enableVoice = selectEnableVoice(store.getState());
    if (enableVoice) {
      play(audioLibrary.StartGame);
      play(audioLibrary.CardShuffle);
    }
  }

  if (lastGeneratedAction >= actionFrequency * 1000) {
    // Don't execute new actions if a command is already executing or if any triggers are awaiting
    if (!ActionService.executing && !ActionService.triggers) {
      const action = generateAction.next();

      if (action && action.value && !action.done) {
        ActionService.execute(action.value);
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
