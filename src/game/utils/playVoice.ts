import play from "engine/audio";
import { getRandomAudioVariation } from "audio";
import store from "common/store";
import { selectEnableVoice } from "common/store/settings";

const playVoice = (variationName: string) => {
  const enableVoice = selectEnableVoice(store.getState());

  if (enableVoice) {
    play(getRandomAudioVariation(variationName));
  }
};

export default playVoice;
