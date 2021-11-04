import formatISO from "date-fns/formatISO";

import store from "@/store";
import { StrokeStyle } from "@/game/enums/StrokeStyle";
import { BookmarkProps } from "@/components/atoms/Bookmark";

export type Game = {
  startTime: string;
  // TODO: Refactor into separate bookmark type
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
    startTime: formatISO(new Date()),
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
