import store from "store";
import createNotification from "engine/createNotification";
import { setStrokeSpeed } from "game/utils/strokeSpeed";
import { getRandomRubStrength } from "game/enums/RubStrength";
import { getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";
import {
  getCurrentStrokeStyle,
  setStrokeStyle,
  setStrokeStyleHandsOff,
} from "game/enums/StrokeStyle";
import { StrokeService } from "game/xstate/services";

/**
 * Task to rub ones nipples while not touching ones cock.
 *
 * @since       14.07.2018
 * @author      the1nstructor
 *
 * @alias       rubNipples
 * @memberof    actions
 */
const rubNipples = async () => {
  const previousStrokeSpeed = StrokeService.strokeSpeed;
  const style = getCurrentStrokeStyle();
  const strength = getRandomRubStrength();
  const taskDuration = getRandomInclusiveInteger(15, 30);

  let message = `Use both of your hands to ${strength}rub your nipples`;

  if (store.game.clothespins === 1) {
    message = `Use one of your hands to ${strength}turn the clothespin on your nipple`;
  } else if (store.game.clothespins > 1) {
    message = `Use both of your hands to ${strength}turn the clothespins on your nipples`;
  }
  createNotification({
    message,
    duration: taskDuration * 1000,
    showProgress: true,
    delay: true,
  });

  setStrokeSpeed(0);
  await setStrokeStyleHandsOff();
  await delay(taskDuration * 1000);

  await delay(2000);

  setStrokeSpeed(previousStrokeSpeed);
  await setStrokeStyle(style);
};
rubNipples.label = "Rub Nipples";

export default rubNipples;
