import { createNotification, dismissNotification } from "engine/notification";
import { StrokeService } from "game/xstate/services";

export const applyIcyHot = async () => {
  StrokeService.pause();
  const notificationId = createNotification({
    message: "Apply a dime sized spot of icyhot to your cock",
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
applyIcyHot.label = "Apply Icyhot";
