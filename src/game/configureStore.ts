import store from "store";
import moment, { Moment } from "moment";
import { StrokeStyle } from "game/enums/StrokeStyle";
import { BookmarkProps } from "components/atoms/Bookmark";

export type Game = {
  startTime: Moment;
  // TODO: Refactor into separte bookmark type
  bookmarks: BookmarkProps[];
  rubberBands: number;
  clothespins: number;
  cockAndBallsBound: boolean;
  ruins: number;
  edges: number;
  orgasms: number;
  strokeStyle: StrokeStyle;
  buttPlugInserted: boolean;
  orgasm: false;
  // Used as a way to override the media player
  youtube: string | null;
  // A hack used to disable the edge/ruin buttons until the xstate machine is updated
  cooldown: boolean;
};

export default function initializeGame() {
  store.game = {
    startTime: moment(),
    bookmarks: [],
    rubberBands: 0,
    clothespins: 0,
    cockAndBallsBound: false,
    ruins: 0,
    edges: 0,
    orgasms: 0,
    strokeStyle: store.config?.defaultStrokeStyle,
    buttPlugInserted: false,
    orgasm: false,
    youtube: null,
    cooldown: false,
  };
}
