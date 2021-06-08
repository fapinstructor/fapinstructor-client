import store from "store";
import createNotification, {
  dismissNotification,
} from "engine/createNotification";
import videoLibrary from "video";
import { getRandomInclusiveInteger } from "utils/math";
import { MediaService, StrokeService } from "game/xstate/services";

const bindCockAndBalls = async () => {
  if (!store.game.cockAndBallsBound) {
    StrokeService.pause();
    MediaService.pause();
    // pause images
    const nid = createNotification({
      message: `Bind your cock & balls`,
      duration: -1,
      delay: true,
    });

    const videos = [
      videoLibrary.CockBallsTie,
      videoLibrary.BallSeperation,
      videoLibrary.CockBallWrapping,
      videoLibrary.BallWrapping,
    ];

    store.game.activeLink = {
      directLink: videos[getRandomInclusiveInteger(0, videos.length - 1)],
    };

    const done = async () => {
      dismissNotification(nid);
      StrokeService.play();
      MediaService.play();
      store.game.cockAndBallsBound = true;
    };
    done.label = "Bound";

    return [done];
  }
};
bindCockAndBalls.label = "Bind Cock & Balls";

export default bindCockAndBalls;
