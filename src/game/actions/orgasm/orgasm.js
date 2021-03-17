import store from "store";
import createNotification, {
  dismissNotification,
} from "engine/createNotification";
import { getRandomStrokeSpeed, setStrokeSpeed } from "game/utils/strokeSpeed";
import delay from "utils/delay";
import play from "engine/audio";
import audioLibrary, { getRandomAudioVariation } from "audio";
import {
  strokerRemoteControl,
  clearStrokeEmissions,
} from "game/loops/strokeEmitter";
import determineEdge from "./edge";
import { chance, getRandomInclusiveInteger } from "utils/math";
import elapsedGameTime from "game/utils/elapsedGameTime";
import { stopGame } from "game";
import { getRandomOrgasm } from "game/actions/orgasm/orgasmInTime";
import {
  getRandomDeniedMessage,
  getRandomEdgeAndHoldMessage,
  getRandomRuinOrgasmMessage,
} from "game/texts/messages";
import createProbability from "game/utils/createProbability";
import { applyProbability } from "game/actions/generateAction";
import { getRandomYouDidGoodMessage } from "game/texts/teasing_messages";

const SIXTY_SECONDS = 60; // That's what makes one minute
const FINAL_EDGE_MIN = 15; // Seconds
const FINAL_EDGE_MAX = 60; // Seconds
const SECONDS_IN_MILLI_SECONDS = 1000; // Factor

/**
 * Determines whether all initially specified bounds that are necessary to be fulfilled before orgasm are fulfilled.
 *
 * @returns {boolean}
 *   Whether these bounds are fulfilled (`true`) or not (`false`)
 */
export const allowedOrgasm = () => {
  const {
    game: { ruins, edges },
    config: { minimumRuinedOrgasms, minimumEdges, minimumGameTime },
  } = store;

  return (
    minimumRuinedOrgasms <= ruins &&
    minimumEdges <= edges &&
    elapsedGameTime("minutes") >= minimumGameTime
  );
};

/**
 * Determines whether it is the right time to orgasm.
 *
 * @returns {boolean}
 *   (`true`) if the user should orgasm now.
 */
export const shouldOrgasm = () => {
  const actualGameTime = store.game.actualGameTime;
  const isAllowedChance = allowedOrgasm();
  let result = false;

  if (isAllowedChance) {
    const rand = Math.random();
    const gameCompletionPercent =
      elapsedGameTime("seconds") / (actualGameTime * SIXTY_SECONDS);

    if (elapsedGameTime("minutes") >= actualGameTime) {
      // If the game time has gone over return true
      result = true;
    } else {
      // Probability Graph: https://www.desmos.com/calculator/xhyaj1gxuc
      result = gameCompletionPercent ** 4 / store.config.actionFrequency > rand;
    }
  }

  return result;
};

/**
 * Makes the user ruin their orgasm.
 * Duplicate code is necessary due to game end functionality.
 *
 * @returns {Promise<done>}
 */
export const doRuin = async () => {
  const {
    config: { fastestStrokeSpeed },
  } = store;

  setStrokeSpeed(fastestStrokeSpeed);

  if (store.enableVoice) {
    play(audioLibrary.RuinItForMe);
  }

  const nid = createNotification(getRandomRuinOrgasmMessage());

  const done = async () => {
    dismissNotification(nid);
    store.game.ruins++;
    await end();
  };
  done.label = "Ruined";

  return done;
};

/**
 * Selects the standard orgasm or a random advanced if enabled
 *
 * @returns {Promise<*>} action - the action to be executed next
 */
export const advancedOrNotOrgasm = async () => {
  let trigger;
  if (store.config.advancedOrgasm) {
    trigger = getRandomOrgasm();

    // Overwrite if user should be denied instead - only applies to advanced orgasm games
    // denial Chance may increase if user does not behave as expected.
    if (chance(store.game.chanceForDenial)) {
      trigger = doDenied;
    }
  } else {
    trigger = doOrgasm;
  }
  return await trigger();
};

/**
 * Allow the user to cum.
 *
 * @returns {Promise<*[]>}
 */
export const doOrgasm = async () => {
  const {
    config: { fastestStrokeSpeed },
  } = store;

  setStrokeSpeed(fastestStrokeSpeed);

  if (store.enableVoice) {
    play(getRandomAudioVariation("Orgasm"));
  }

  const nid = createNotification({
    message: "You have permission to have a full orgasm",
  });

  const done = async () => {
    dismissNotification(nid);

    await postOrgasmTorture();
    await end();
  };
  done.label = "Orgasmed";

  return [done, skip];
};

/**
 * If postOrgasmTorture is active, this task lets the user stroke on with the current stroking style, grip and speed.
 *
 * @returns {Promise<void>}
 */
export const postOrgasmTorture = async () => {
  const {
    config: {
      postOrgasmTorture,
      postOrgasmTortureMinimumTime,
      postOrgasmTortureMaximumTime,
    },
  } = store;

  if (postOrgasmTorture) {
    const nid = createNotification({
      message: "Time for a little post-orgasm torture, don't you dare stop!",
    });

    await delay(
      getRandomInclusiveInteger(
        postOrgasmTortureMinimumTime,
        postOrgasmTortureMaximumTime
      ) * SECONDS_IN_MILLI_SECONDS
    );

    dismissNotification(nid);

    createNotification({
      message: "I guess you've had enough.  You may stop.",
    });
    setStrokeSpeed(0);
    await delay(3 * SECONDS_IN_MILLI_SECONDS);
  }
};

/**
 * The user is __not__ allowed to cum and has to end the session.
 *
 * @returns {Promise<done>}
 */
export const doDenied = async () => {
  const {
    config: { fastestStrokeSpeed },
  } = store;

  setStrokeSpeed(fastestStrokeSpeed);

  if (store.enableVoice) {
    play(getRandomAudioVariation("Denied"));
  }

  const nid = createNotification({ message: getRandomDeniedMessage() });

  const done = async () => {
    dismissNotification(nid);
    await end();
  };
  done.label = "Denied";

  return done;
};

/**
 * Let the game go on by increasing the maximum game time by 20%.
 *
 * @returns {Promise<void>}
 */
export const skip = async () => {
  setStrokeSpeed(getRandomStrokeSpeed());

  // extend the game by 20%
  store.config.maximumGameTime *= 1.2;

  // Mistress did not like that. 10% Denial Chance Increase!
  store.config.chanceForDenial += 5;
};
skip.label = "Skip & Add Time";

/**
 * "Should I stay or should I go now?"
 *
 * If the maximum number of orgasms is not reached yet, the game will go on.
 * Else it will end at this point.
 *
 * @returns {Promise<void>}
 */
export const end = async () => {
  const { maximumOrgasms } = store.config;

  clearStrokeEmissions();
  strokerRemoteControl.pause();

  // should continue?
  if (parseInt(store.game.orgasms, 10) + 1 < parseInt(maximumOrgasms, 10)) {
    setStrokeSpeed(getRandomStrokeSpeed());
    strokerRemoteControl.play();
    createNotification({ message: "Start stroking again" });
    play(audioLibrary.StartStrokingAgain);
    await delay(3 * SECONDS_IN_MILLI_SECONDS);
  } else {
    setStrokeSpeed(0);
    createNotification({
      message: getRandomYouDidGoodMessage(),
      duration: -1,
    });
    await delay(15 * SECONDS_IN_MILLI_SECONDS);
    stopGame();
  }
  store.game.orgasms++; //has to be done last as the GamePage will turn as soon as this is increased.
};

/**
 * Let the user do edge and hold edgingTime seconds
 *
 * @param edgingTime
 *   how long the final edge will last
 * @returns {Promise<function(): *[]>}
 */
const finalEdgeAndHold = async (
  edgingTime = getRandomInclusiveInteger(FINAL_EDGE_MIN, FINAL_EDGE_MAX)
) => {
  return determineEdge(edgingTime, getRandomEdgeAndHoldMessage());
};

/**
 * let the user have the initially specified ending (ruin, denied or orgasm).
 *
 * The game end can be chosen at random by using this function.
 * Fetches one of all game ends.
 * @returns {action}
 *   A random game end.
 */
export const getRandomGameEnd = async () => {
  //reset in case of multiple ends.
  store.game.orgasm = false;
  const chosenActions = determineGameEnd();
  return await applyProbability(chosenActions, 1)[0]();
};

/**
 * Manually created list of all game ends with probabilities required in final game phase.
 *
 * @returns {*[]}
 *   an array with all the function-probability pairs: {func, probability}
 */
export const determineGameEnd = () =>
  [
    // list of all available orgasms
    !!store.config.finalOrgasmAllowed &&
      createProbability(
        advancedOrNotOrgasm,
        parseInt(store.config.allowedProbability, 10)
      ),
    !!store.config.finalOrgasmDenied &&
      createProbability(doDenied, parseInt(store.config.deniedProbability, 10)),
    !!store.config.finalOrgasmRuined &&
      createProbability(doRuin, parseInt(store.config.ruinedProbability, 10)),
  ].filter((action) => !!action);

export default finalEdgeAndHold;
