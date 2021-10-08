import { createMachine, assign, send } from "xstate";
import { createNotification } from "engine/notification";
import { Severity } from "common/store/notifications";
import MediaLink, { MediaType } from "common/types/Media";
import { GameConfig } from "configureStore";
import fetchRedditPics from "api/fetchRedditPics";

const PRELOAD_LINK_THRESHOLD = 5;
const ESTIMATED_SKIP_RATE = 1.5;
const LIMIT_CAP = 1000;

function getEstimatedRequiredLinkCount(
  maximumGameTime: number,
  slideDuration: number
) {
  return Math.min(
    ((maximumGameTime * 60) / slideDuration) * ESTIMATED_SKIP_RATE,
    LIMIT_CAP
  );
}

function preloadImage(url: string) {
  new Image().src = url;
}

export type MediaMachine = ReturnType<typeof createMediaMachine>;

export type MediaMachineContext = {
  links: MediaLink[];
  linkIndex: number;
};

export type StopEvent = {
  type: "STOP";
};

export type MediaMachineEvent =
  | { type: "FETCH" }
  | { type: "LOAD_MORE_LINKS" }
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "NEXT_LINK" }
  | { type: "PREVIOUS_LINK" }
  | { type: "PRELOAD_LINK" }
  | StopEvent;

export function createMediaMachine(config: GameConfig) {
  const estimatedRequiredLinkCount = getEstimatedRequiredLinkCount(
    config.gameDuration.max,
    config.slideDuration
  );

  const mediaMachine = createMachine<MediaMachineContext, MediaMachineEvent>(
    {
      id: "media",
      initial: "fetching",
      context: {
        links: [],
        linkIndex: 0,
      },
      on: {
        STOP: {
          target: "stopped",
        },
      },
      states: {
        stopped: {
          type: "final",
        },
        fetching: {
          invoke: {
            id: "fetchMedia",
            src: () =>
              fetchRedditPics({
                subreddits: config.subreddits,
                limit: estimatedRequiredLinkCount,
                mediaTypes: config.imageType,
              }),
            onDone: {
              target: "playing",
              actions: assign((context, event) => ({
                links: context.links.concat(event.data),
              })),
            },
            onError: {
              target: "paused",
              actions: (context, event) => {
                createNotification({
                  message: `Error fetching media: ${event.data}.message}`,
                  duration: -1,
                  severity: Severity.ERROR,
                });
              },
            },
          },
          on: {
            PAUSE: "paused",
          },
        },
        paused: {
          on: {
            FETCH: "fetching",
            PLAY: "playing",
          },
        },
        playing: {
          on: {
            FETCH: "fetching",
            PAUSE: "paused",
            NEXT_LINK: {
              cond: "hasNextLink",
              actions: [
                "nextLink",
                send("PRELOAD_LINK"),
                send("LOAD_MORE_LINKS"),
              ],
            },
            PREVIOUS_LINK: {
              cond: "hasPreviousLink",
              actions: "previousLink",
            },
            PRELOAD_LINK: {
              cond: "isNextLinkPreloadable",
              actions: "preloadLink",
            },
            LOAD_MORE_LINKS: {
              cond: "shouldLoadMoreLinks",
              target: "fetching",
            },
          },
        },
      },
    },
    {
      actions: {
        preloadLink: ({ linkIndex, links }) => {
          const nextLink = links[linkIndex + 1];
          preloadImage(nextLink.directLink);
        },
        nextLink: assign((context) => ({
          linkIndex: context.linkIndex + 1,
        })),
        previousLink: assign((context) => ({
          linkIndex: context.linkIndex - 1,
        })),
      },
      guards: {
        isNextLinkPreloadable: ({ links, linkIndex }) => {
          let nextLinkPreloadable = false;

          const nextLink = links[linkIndex + 1];
          if (
            nextLink &&
            (nextLink.mediaType === MediaType.Picture ||
              nextLink.mediaType === MediaType.Gif)
          ) {
            nextLinkPreloadable = true;
          }

          return nextLinkPreloadable;
        },
        shouldLoadMoreLinks: ({ links, linkIndex }) => {
          return links.length - linkIndex < PRELOAD_LINK_THRESHOLD;
        },
        hasNextLink: ({ links, linkIndex }) => {
          return Boolean(links[linkIndex + 1]);
        },
        hasPreviousLink: ({ linkIndex }) => {
          return linkIndex > 0;
        },
      },
    }
  );

  return mediaMachine;
}
