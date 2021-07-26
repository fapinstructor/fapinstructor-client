import { createNotification, dismissNotification } from "engine/notification";
import { StrokeService } from "game/xstate/services";

export const applyToothpaste = async () => {
  StrokeService.pause();
  const notificationId = createNotification({
    message: "Apply a dime sized spot of toothpaste to the head of your cock",
    duration: -1,
    delay: true,
  });

  const done = async () => {
    StrokeService.play();
    dismissNotification(notificationId);
  };
  done.label = "Applied";

  return [done];
};
applyToothpaste.label = "Apply Toothpaste";
