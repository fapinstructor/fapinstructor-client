import store from "store";
import interrupt from "./interrupt";
import { TIME_DELAY } from "components/organisms/BeatMeter/settings";

store.engine = {
  actionTriggers: null,
  executing: false,
};

/**
 * Executes the specified action
 *
 * +----------------------------------+
 * |      Supports the following      |
 * +----------------------------------+
 * | -action executed immediately     |
 * | -action is executed on trigger   |
 * | -execution completes instantly   |
 * | -execution completes overtime    |
 * | -actions can be interrupted      |
 * +----------------------------------+
 * @param {A function that returns null or a promise} action
 * @param {If an action is already executing, should it be interrupted} shouldInterrupt
 */
const executeAction = (action, shouldInterrupt = false) => {
  const { engine } = store;

  if (typeof action !== "function") {
    throw new Error(`action is not a function, ${action}`);
  }

  if (shouldInterrupt) {
    interrupt();
  }

  engine.actionTriggers = null;
  engine.executing = true;

  return action()
    .then((trigger) => {
      if (trigger) {
        setTimeout(() => {
          engine.actionTriggers = Array.isArray(trigger) ? trigger : [trigger];
        }, TIME_DELAY / 2);
      }
      engine.executing = false;
    })
    .catch((e) => {
      if (!e || e.reason !== "interrupt") {
        console.error(e);
      }
    });
};

export default executeAction;
