import { createNotification } from "@/game/engine/notification";
import { getRandomInclusiveInteger } from "@/utils/math";
import { delay } from "@/game/engine/delay";

export const holdBreath = async () => {
  const holdTime = getRandomInclusiveInteger(10, 60);

  createNotification({ message: "Take a deep breath" });
  await delay(5 * 1000);

  createNotification({
    message: "Hold your breath and stroke",
    duration: holdTime * 1000,
    showProgress: true,
  });
  await delay(holdTime * 1000);

  await delay(3 * 1000);
};
holdBreath.label = "Hold Breath";

export default holdBreath;
