import store from "store";
import createNotification from "engine/createNotification";
import { setStrokeSpeed } from "game/utils/strokeSpeed";
import { getRandomRubStrength } from "game/enums/RubStrength";
import { getRandomLeftOrRight } from "game/enums/HandSide";
import { getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";
import {
  getCurrentStrokeStyle,
  setRandomOneHandedStrokeStyle,
  setStrokeStyle,
} from "game/enums/StrokeStyle";

/**
 * Task to play with ones nipples while stroking ones cock.
 *
 * @since      15.07.2018
 * @author     the1nstructor
 *
 * @alias      nipplesAndStroke
 * @memberof   actions
 */
const nipplesAndStroke = async () => {
  const previousStrokeSpeed = store.game.strokeSpeed;
  const style = getCurrentStrokeStyle();
  // get Random strength
  const strength = getRandomRubStrength();
  const left_or_right = getRandomLeftOrRight();

  // task duration (= total time in this case)
  const taskDuration = getRandomInclusiveInteger(10, 25);
  await setRandomOneHandedStrokeStyle();

  let message = `Use one of your hands to ${strength}play with your ${left_or_right} nipple`;

  if (store.game.clothespins === 1) {
    message = `Use one of your hands to ${strength}turn the clothespin on your nipple`;
  } else if (store.game.clothespins > 1) {
    message = `Use one of your hands to ${strength}turn the clothespin on your ${left_or_right} nipple`;
  }

  createNotification({
    message,
    duration: taskDuration * 1000,
    showProgress: true,
  });

  await delay((taskDuration + 1) * 1000);

  setStrokeSpeed(previousStrokeSpeed);
  await setStrokeStyle(style);
};
nipplesAndStroke.label = "Nipple and Stroke";

export default nipplesAndStroke;
