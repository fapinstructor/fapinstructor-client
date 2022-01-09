import * as Sentry from "@sentry/react";
import { useService } from "@xstate/react";
import { interpret, InterpreterFrom } from "xstate";

import {
  createMediaMachine,
  MediaMachine,
} from "@/game/xstate/machines/mediaMachine";
import { GameConfig } from "@/configureStore";
import { getLocalMediaLinks } from "@/features/file-system";

import fetchRedditPics from "../api/fetchRedditPics";

let machine: MediaMachine;
let service: InterpreterFrom<MediaMachine>;

export function getMediaService() {
  if (!service) {
    throw new Error("You must first initialize the media service");
  }
  return service;
}

const ESTIMATED_SKIP_RATE = 1.5;
const UPPER_LIMIT_CAP = 1000;
const LOWER_LIMIT_CAP = 10;

function getEstimatedRequiredLinkCount(
  maximumGameTime: number,
  slideDuration: number
) {
  let estimatedLinksRequired =
    ((maximumGameTime * 60) / slideDuration) * ESTIMATED_SKIP_RATE;

  // Cap the upper limit of the number of links to fetch.
  estimatedLinksRequired = Math.min(estimatedLinksRequired, UPPER_LIMIT_CAP);

  // Cap the lower limit of the number of links to fetch.
  estimatedLinksRequired = Math.max(estimatedLinksRequired, LOWER_LIMIT_CAP);

  // TODO: Unsure why, but sometimes the number is NaN.  Will investigate later once Sentry stops dropping events.
  // For now if it's NaN let's set it to the lower limit cap to prevent an exception.
  if (Number.isNaN(estimatedLinksRequired)) {
    estimatedLinksRequired = LOWER_LIMIT_CAP;

    Sentry.captureException(
      new Error(
        `getEstimatedRequiredLinkCount returns NaN, maximumGameTime: ${maximumGameTime}, slideDuration:${slideDuration}`
      )
    );
  }

  return Math.round(estimatedLinksRequired);
}

const MediaService = {
  async initialize(gameConfig: GameConfig) {
    if (service) {
      service.stop();
    }

    let getMediaLinks;

    const localMediaLinks = await getLocalMediaLinks();
    if (localMediaLinks.length > 0) {
      getMediaLinks = async () => localMediaLinks;
    } else {
      const estimatedRequiredLinkCount = getEstimatedRequiredLinkCount(
        gameConfig.gameDuration.max,
        gameConfig.slideDuration
      );

      getMediaLinks = () => {
        return fetchRedditPics({
          subreddits: gameConfig.subreddits,
          limit: estimatedRequiredLinkCount,
          mediaTypes: gameConfig.imageType,
        });
      };
    }

    machine = createMediaMachine(getMediaLinks);
    service = interpret(machine);

    // Automatically start the service after it's created
    service.start();
  },
  stop() {
    if (!this.stopped) {
      getMediaService().send("STOP");
    }
  },
  get stopped() {
    return getMediaService().state.matches("stopped");
  },
  previousLink() {
    getMediaService().send("PREVIOUS_LINK");
  },
  nextLink() {
    getMediaService().send("NEXT_LINK");
  },
  pause() {
    getMediaService().send("PAUSE");
  },
  play() {
    getMediaService().send("PLAY");
  },
  get paused() {
    return getMediaService().state.value === "paused";
  },
};

export function useMediaService() {
  return useService(getMediaService());
}

export default MediaService;
