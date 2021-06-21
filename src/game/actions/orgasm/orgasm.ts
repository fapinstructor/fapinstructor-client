import store from "store";
import createNotification, {
  dismissNotification,
} from "engine/createNotification";
import { getRandomStrokeSpeed, setStrokeSpeed } from "game/utils/strokeSpeed";
import delay from "utils/delay";
import { playCommand } from "engine/audio";
import audioLibrary, { getRandomAudioVariation } from "audio";
import { getRandomInclusiveInteger } from "utils/math";
import { stopGame } from "game";
import {
  getRandomDeniedMessage,
  getRandomRuinOrgasmMessage,
} from "game/texts/messages";
import { StrokeService } from "game/xstate/services";

/**
 * Makes the user ruin their orgasm.
 * Duplicate code is necessary due to game end functionality.
 */
export const doRuin = async () => {
  const {
    config: { fastestStrokeSpeed },
  } = store;

  setStrokeSpeed(fastestStrokeSpeed);
  playCommand(audioLibrary.RuinItForMe);

  const nid = createNotification(getRandomRuinOrgasmMessage());

  const done = async () => {
    dismissNotification(nid);
    store.game.ruins++;
    await end();
  };
  done.label = "Ruined";

  return done;
};

export const doOrgasm = async () => {
  const {
    config: { fastestStrokeSpeed, postOrgasmTorture },
  } = store;

  setStrokeSpeed(fastestStrokeSpeed);
  playCommand(getRandomAudioVariation("Orgasm"));

  const nid = createNotification({
    message: "You have permission to have a full orgasm",
  });

  const done = async () => {
    dismissNotification(nid);

    if (postOrgasmTorture) {
      await doPostOrgasmTorture();
    }
    await end();
  };
  done.label = "Orgasmed";

  const skip = async () => {
    dismissNotification(nid);

    setStrokeSpeed(getRandomStrokeSpeed());

    // extend the game by 20%
    store.config.maximumGameTime *= 1.2;
  };
  skip.label = "Skip";

  return [done, skip];
};

export const doPostOrgasmTorture = async () => {
  const {
    config: { postOrgasmTortureMinimumTime, postOrgasmTortureMaximumTime },
  } = store;

  const nid = createNotification({
    message: "Time for a little post-orgasm torture, don't you dare stop!",
  });

  await delay(
    getRandomInclusiveInteger(
      postOrgasmTortureMinimumTime,
      postOrgasmTortureMaximumTime
    ) * 1000
  );

  dismissNotification(nid);

  createNotification({
    message: "I guess you've had enough.  You may stop.",
  });
  setStrokeSpeed(0);
  await delay(3 * 1000);
};

export const doDenied = async () => {
  const {
    config: { fastestStrokeSpeed },
  } = store;

  setStrokeSpeed(fastestStrokeSpeed);

  playCommand(getRandomAudioVariation("Denied"));

  const nid = createNotification({ message: getRandomDeniedMessage() });

  const done = async () => {
    dismissNotification(nid);
    await end();
  };
  done.label = "Denied";

  return done;
};

export const end = async () => {
  const { maximumOrgasms } = store.config;

  StrokeService.pause();

  // should continue?
  if (store.game.orgasms + 1 < maximumOrgasms) {
    setStrokeSpeed(getRandomStrokeSpeed());
    StrokeService.play();
    createNotification({ message: "Start stroking again" });
    playCommand(audioLibrary.StartStrokingAgain);
    await delay(3 * 1000);
  } else {
    setStrokeSpeed(0);
    createNotification({
      message: "Thanks for playing.  I hope you got what you deserved.",
      duration: -1,
    });
    await delay(15 * 1000);
    stopGame();
  }
  store.game.orgasms++; //has to be done last as the GamePage will turn as soon as this is increased.
};
