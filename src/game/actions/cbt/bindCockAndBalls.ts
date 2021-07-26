import store from "store";
import { createNotification, dismissNotification } from "engine/notification";
import videoLibrary from "video";
import { getRandomItem } from "utils/math";
import { MediaService, StrokeService } from "game/xstate/services";

const videos = Object.values(videoLibrary);

export const bindCockAndBalls = async () => {
  if (!store.game.cockAndBallsBound) {
    StrokeService.pause();
    MediaService.pause();
    // pause images
    const nid = createNotification({
      message: `Bind your cock & balls`,
      duration: -1,
      delay: true,
    });

    store.game.youtube = getRandomItem(videos);

    const done = async () => {
      dismissNotification(nid);
      StrokeService.play();
      MediaService.play();
      store.game.cockAndBallsBound = true;
      store.game.youtube = null;
    };
    done.label = "Bound";

    return [done];
  }
};
bindCockAndBalls.label = "Bind Cock & Balls";
