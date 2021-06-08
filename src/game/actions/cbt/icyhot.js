import createNotification, {
  dismissNotification,
} from "engine/createNotification";
import { StrokeService } from "game/xstate/services";

const applyIcyHot = async () => {
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

export default applyIcyHot;
