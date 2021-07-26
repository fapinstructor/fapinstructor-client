import { createNotification, dismissNotification } from "engine/notification";
import { StrokeService } from "game/xstate/services";

export const scratchChest = async () => {
  StrokeService.pause();

  const notificationId = createNotification({
    message: "Scratch your chest with your fingernails",
    duration: -1,
    delay: true,
  });

  const done = async () => {
    StrokeService.play();
    dismissNotification(notificationId);
  };
  done.label = "Scratched";

  return [done];
};
scratchChest.label = "Scratch Chest";

export const scratchThighs = async () => {
  StrokeService.pause();

  const notificationId = createNotification({
    message: "Scratch your thighs with your fingernails",
    duration: -1,
    delay: true,
  });

  const done = async () => {
    StrokeService.play();
    dismissNotification(notificationId);
  };
  done.label = "Scratched";

  return [done];
};
scratchThighs.label = "Scratch Thighs";

export const scratchShoulders = async () => {
  StrokeService.pause();

  const notificationId = createNotification({
    message: "Scratch your shoulders with your fingernails",
    duration: -1,
    delay: true,
  });

  const done = async () => {
    StrokeService.play();
    dismissNotification(notificationId);
  };
  done.label = "Scratched";

  return [done];
};
scratchShoulders.label = "Scratch Shoulders";
