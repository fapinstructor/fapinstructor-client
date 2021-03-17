import store from "store";
import moment, { Moment } from "moment";
import { getRandomStrokeSpeed } from "game/utils/strokeSpeed";
import { getRandomInclusiveInteger } from "utils/math";
import MediaLink, { MediaType } from "common/types/Media";
import config from "config";
import { StrokeStyle } from "game/enums/StrokeStyle";
import { MediaPlayerProps } from "components/organisms/MediaPlayer/MediaPlayer";
import { BookmarkProps } from "components/atoms/Bookmark";

const DEFAULT_BACKGROUND_IMAGE = `${config.imageUrl}/default-image.jpg`;

export type Game = {
  strokes: number;
  startTime: Moment;
  pictures: MediaLink[];
  pictureIndex: number;
  activeLink: MediaPlayerProps["link"] | null;
  mediaFrozen: boolean;
  strokeSpeedBaseline: number;
  strokeSpeed: number;
  actualGameTime?: number;
  // TODO: Refactor into separte bookmark type
  bookmarks: BookmarkProps[];
  gripStrength: number;
  rubberBands: number;
  clothespins: number;
  cockAndBallsBound: boolean;
  ruins: number;
  edges: number;
  orgasms: number;
  strokeStyle: StrokeStyle;
  buttPlugInserted: boolean;

  // orgasm
  orgasm: false;
  // even if only chosen orgasm one may be denied in the end
  chanceForDenial: 0; //percent
  // edging Ladder
  edgingLadder: false;
  edgingLadderLength: 2;
  edgingLadderRung: 0;
  edgingLadderCooldowns: 1; //every 4 ladder edges one long cooldown is required
};

export default function initializeGame() {
  store.game = {
    strokes: 0,
    startTime: moment(),
    pictures: [
      {
        sourceLink: DEFAULT_BACKGROUND_IMAGE,
        directLink: DEFAULT_BACKGROUND_IMAGE,
        mediaType: MediaType.Picture,
      },
    ],
    pictureIndex: -1,
    activeLink: null,
    mediaFrozen: false,
    strokeSpeedBaseline: 0,
    strokeSpeed: getRandomStrokeSpeed({ fast: 2 }),
    actualGameTime:
      store.config &&
      getRandomInclusiveInteger(
        store.config.minimumGameTime,
        store.config.maximumGameTime
      ),
    bookmarks: [],
    gripStrength: store.config?.initialGripStrength,
    rubberBands: 0,
    clothespins: 0,
    cockAndBallsBound: false,
    ruins: 0,
    edges: 0,
    orgasms: 0,
    strokeStyle: store.config?.defaultStrokeStyle,
    buttPlugInserted: false,

    // orgasm
    orgasm: false,
    // even if only chosen orgasm one may be denied in the end
    chanceForDenial: 0, //percent
    // edging Ladder
    edgingLadder: false,
    edgingLadderLength: 2,
    edgingLadderRung: 0,
    edgingLadderCooldowns: 1, //every 4 ladder edges one long cooldown is required
  };
}
