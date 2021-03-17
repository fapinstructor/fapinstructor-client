import store from "store";
import createNotification, {
  dismissAllNotifications,
  dismissNotification,
} from "engine/createNotification";
import { setStrokeSpeed } from "game/utils/strokeSpeed";
import delay from "utils/delay";
import play from "engine/audio";
import { getRandomAudioVariation } from "audio";
import { getRandomInclusiveInteger } from "utils/math";
import {
  doOrgasm,
  end,
  postOrgasmTorture,
  skip,
} from "game/actions/orgasm/orgasm";
import punishment from "game/actions/punishment";
import {
  getRandomDidYouCumMessage,
  getRandomHurryUpMessage,
  getRandomEdgeInTimeMessage,
  getRandomOrgasmAdvancedMessage,
  getRandomOrgasmInTimeMessage,
} from "game/texts/messages";
import { setDefaultGrip } from "game/actions/grip";
import { setDefaultStrokeStyle } from "game/enums/StrokeStyle";
import executeAction from "engine/executeAction";
import { applyProbability } from "game/actions/generateAction";
import createProbability from "game/utils/createProbability";

/**
 * Plays a orgasm sound and creates a random orgasm notification.
 * Also sets stroke style, grip and speed.
 *
 * @param {string} message
 *   the message to be displayed
 * @returns {Promise<*>}
 *   notificationId - the id of the message to be dismissed in the next step.
 */
export const getToTheOrgasm = (message = getRandomEdgeInTimeMessage()) => {
  const {
    config: { fastestStrokeSpeed },
    enableVoice,
  } = store;

  if (enableVoice) {
    play(getRandomAudioVariation("Orgasm"));
  }

  setStrokeSpeed(fastestStrokeSpeed);
  setDefaultGrip();
  setDefaultStrokeStyle();

  return createNotification({ message, duration: -1 });
};

/**
 * Plays a orgasm sound and creates a random orgasmAdvanced notification.
 *
 * @param {string} message
 *   the message to be displayed
 * @returns {*}
 */
export const getToTheOrgasmAdvanced = (
  message = getRandomOrgasmAdvancedMessage()
) => {
  if (store.enableVoice) {
    play(getRandomAudioVariation("Orgasm"));
  }
  return createNotification({ message, duration: -1 });
};

/**
 * Allow the user to cum. But only if he can do it in time.
 *
 * Recommendation: An edge before this action would make sense.
 *
 * @returns {Promise<*[]>}
 *   the trigger to display
 */
export const doOrgasmInTime = async (
  timer = getRandomInclusiveInteger(5, 60),
  orgasmFunc = getToTheOrgasm
) => {
  let orgasmed = false;

  const notificationId = await orgasmFunc(getRandomOrgasmInTimeMessage());

  const trigger_done = async () => {
    orgasmed = true;
    dismissNotification(notificationId);
    dismissNotification(timerId);

    await postOrgasmTorture();
    await end();
  };
  trigger_done.label = "Orgasmed";

  const countdown = async () => {
    await delay((timer + 1) * 1000); // Wait till the timer runs up
    // now check whether user did reach the orgasm in time
    if (!orgasmed) {
      //store.engine.actionTriggers = null;
      dismissNotification(notificationId);
      dismissNotification(timerId);
      await executeAction(punishment, true); // Interrupt other action (trigger_done)
      await skip();
    }
  };

  const timerId = createNotification({
    message: getRandomHurryUpMessage(),
    duration: timer * 1000,
    showProgress: true,
  });

  countdown(); // don't wait for the promise just start the thread.

  return [trigger_done];
};

/**
 * Allow the user to cum. He make take infinite time, but he mustn't
 * change the speed or grip or style of stroking to do so.
 *
 * Recommendation: The user should be at the brink of orgasm before calling this method.
 *
 * @returns {Promise<*[]>}
 *   the triggers to be displayed
 */
export const doOrgasmAdvanced = async () => {
  const notificationId = await getToTheOrgasmAdvanced(
    getRandomOrgasmAdvancedMessage()
  );

  const trigger_done = async () => {
    dismissNotification(notificationId);

    await postOrgasmTorture();
    await end();
  };
  trigger_done.label = "Orgasmed";

  const trigger_fail = async () => {
    // Increase game time on fail.
    dismissNotification(notificationId);
    await punishment();
    await skip();
  };
  trigger_fail.label = "I can't";

  return [trigger_done, trigger_fail];
};

/**
 * Hardest task. User has to cum without changing style, pace or grip and has a time limit.
 *
 * @returns {Promise<*[]>}
 */
export const doOrgasmAdvancedInTime = async () => {
  return await doOrgasmInTime(
    getRandomInclusiveInteger(30, 90),
    getToTheOrgasmAdvanced
  );
};

/**
 * Harder version of doOrgasmInTime: Instead of displaying a continuously
 * running progress bar only a countdown with random counting intervals is displayed.
 *
 * I am thinking of big white letters in the middle of the screen over the videos/gifs/picture.
 * maybe transparency 50% and fading out after 1-2 seconds of display
 *
 * When reaching Zero the user gets a very short amount of time to orgasm.
 *
 * @returns {Promise<void>}
 */
export const doOrgasmCountdown = async () => {
  //TODO: More FANCY Countdown Numbers, displayed across the whole screen
  //Introduction
  const message1 =
    "You now will eventually be allowed to cum, but only if you manage to time it perfectly.   " +
    "I'm going to count you down from 10 to 0. Be ready to cum at 0. Not sooner nor later!";
  const nID1 = createNotification({ message: message1, duration: -1 });
  await delay(10 * 1000);
  dismissNotification(nID1);

  const message2 =
    "You may from now on stroke with any pace you like ...         Lets get started!";
  const nID2 = createNotification({ message: message2, duration: -1 });
  setStrokeSpeed(0);
  await delay(8 * 1000);
  dismissNotification(nID2);

  for (let i = 10; i >= 8; i--) {
    // displayNumber(i);
    const nID = createNotification({ message: i, duration: -1 });
    const time = getRandomInclusiveInteger(2, 8);
    await delay(time * 1000);
    dismissNotification(nID);
  }

  for (let i = 7; i >= 6; i--) {
    // displayNumber(i);
    const nID = createNotification({ message: i, duration: -1 });
    const time = getRandomInclusiveInteger(8, 30);
    await delay(time * 1000);
    dismissNotification(nID);
  }

  for (let i = 5; i >= 2; i--) {
    // displayNumber(i);
    const nID = createNotification({ message: i, duration: -1 });
    const time = getRandomInclusiveInteger(1, 10);
    await delay(time * 1000);
    dismissNotification(nID);
  }
  const nID3 = createNotification({
    message: "1     ... get ready!",
    duration: -1,
  });
  const time = getRandomInclusiveInteger(7, 30);
  await delay(time * 1000);
  dismissNotification(nID3);

  const cumTime = getRandomInclusiveInteger(8, 55);
  createNotification({
    message: "Cum!",
    showProgress: true,
    duration: cumTime * 1000,
  });
  if (store.enableVoice) {
    play(getRandomAudioVariation("Orgasm"));
  }

  await delay(cumTime * 1000);
  dismissAllNotifications();

  // After the countdown, did the user cum?
  const didYouID = createNotification({
    message: getRandomDidYouCumMessage(),
  });

  const trigger_done = async () => {
    dismissNotification(didYouID);
    await postOrgasmTorture();
    await end();
  };
  trigger_done.label = "I finished";

  const trigger_fail = async () => {
    // Increase game time on fail.
    dismissNotification(didYouID);
    await punishment();
    await skip();
  };
  trigger_fail.label = "I couldn't";

  return [trigger_done, trigger_fail];
};
/**
 * TODO: Implement further advanced version.
 * @returns {Promise<void>}
 */
export const doOrgasmAdvancedCountdown = async () => {};

/**
 * Fetches one of all orgasms.
 * Difficulty: mostly advanced
 * @returns {action}
 *   A random action
 */
export const getRandomOrgasm = () => {
  const chosenActions = initializeOrgasms();
  return applyProbability(chosenActions, 1)[0];
};

/**
 * Manually created list of all orgasms with probabilities required in final orgasm phase:
 * createProbability takes your action and the probability percentage the action will be invoked
 * as an orgasm in the end of the game
 *
 * @returns {*[]}
 *   an array with all the function-probability pairs: {func, probability}
 */
export const initializeOrgasms = () =>
  [
    // list of all available orgasms
    createProbability(doOrgasmCountdown, 10),
    createProbability(doOrgasmAdvancedInTime, 10),
    createProbability(doOrgasmInTime, 10),
    createProbability(doOrgasmAdvanced, 10),
    createProbability(doOrgasmInTime, 10),
    createProbability(doOrgasm, 1),
  ].filter((action) => !!action);
