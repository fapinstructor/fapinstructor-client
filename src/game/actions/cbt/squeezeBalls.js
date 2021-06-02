import createNotification from "engine/createNotification";
import { getRandomInclusiveInteger } from "utils/math";
import delay from "utils/delay";
import { playCommand } from "engine/audio";
import audioLibrary from "audio";

const squeezeBalls = async () => {
  const time = getRandomInclusiveInteger(15, 40);

  createNotification({
    message: "Squeeze your balls and stroke",
    duration: time * 1000,
    showProgress: true,
    delay: true,
  });

  playCommand(audioLibrary.SqueezeBalls);

  await delay(time * 1000);
};
squeezeBalls.label = "Squeeze Balls";

export default squeezeBalls;
