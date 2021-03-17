import mapDispatchToFunc from "utils/mapDispatchToFunc";
import {
  createNotification,
  dismissNotification,
  dismissAllNotifications,
} from "common/store/notifications";
import playVoice from "game/utils/playVoice";
import {
  getRandomStrokeSpeed,
  getAverageStrokeSpeed,
  setStrokeSpeed,
} from "game/utils/strokeSpeed";
import delay from "utils/delay";
import { getRandomAudioVariation } from "audio";
import getRandomDuration from "game/utils/getRandomDuration";

export type CreateInstructionOptions = {
  label: string;
};

export type Instruction = {
  label: string;
};

/**
 * A factory method that composes useful functions and injects
 * them into the supplied function
 * @param {*} label
 * @param {*} func
 */
const createInstruction = (
  func: () => unknown,
  options: CreateInstructionOptions
) => {
  const dispatchFuncs = {
    createNotification,
    dismissNotification,
    dismissAllNotifications,
  };

  const regularFuncs = {
    playVoice,
    delay,
    setStrokeSpeed,
    getRandomStrokeSpeed,
    getAverageStrokeSpeed,
    getRandomDuration,
    getRandomAudioVariation,
  };

  const instruction = mapDispatchToFunc(dispatchFuncs, regularFuncs)(func);

  //@ts-expect-error
  instruction.label = options.label;

  return instruction;
};
export default createInstruction;
