import store from "@/store";
import {
  createNotification,
  dismissNotification,
} from "@/game/engine/notification";
import { StrokeService } from "@/game/xstate/services";

export const addClothespin = async () => {
  if (store.game.clothespins < 2) {
    StrokeService.pause();
    const clothespins = store.game.clothespins + 1;
    const notificationId = createNotification({
      message: "Attach a clothespin to a free nipple",
      duration: -1,
      delay: true,
    });

    const done = async () => {
      StrokeService.play();
      store.game.clothespins = clothespins;
      dismissNotification(notificationId);
    };
    done.label = "Attached";

    return [done];
  }
};
addClothespin.label = "Add Clothespin";

export const removeClothespin = async () => {
  if (store.game.clothespins > 0) {
    StrokeService.pause();
    const clothespins = store.game.clothespins - 1;
    const notificationId = createNotification({
      message: "Remove a clothespin",
      duration: -1,
      delay: true,
    });

    const done = async () => {
      StrokeService.play();
      store.game.clothespins = clothespins;
      dismissNotification(notificationId);
    };
    done.label = "Removed";

    return [done];
  }
};
removeClothespin.label = "Remove Clothespin";
