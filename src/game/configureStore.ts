import store from "store";
import moment, { Moment } from "moment";
import { getRandomInclusiveInteger } from "utils/math";
import { StrokeStyle } from "game/enums/StrokeStyle";
import { BookmarkProps } from "components/atoms/Bookmark";

export type Game = {
  strokes: number;
  startTime: Moment;
  actualGameTime?: number;
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

  // orgasm
  orgasm: false;
  // even if only chosen orgasm one may be denied in the end
  chanceForDenial: 0; //percent
  // edging Ladder
  edgingLadder: false;
  edgingLadderLength: 2;
  edgingLadderRung: 0;
  edgingLadderCooldowns: 1; //every 4 ladder edges one long cooldown is required

  edging: boolean;
  ruining: boolean;
};

export default function initializeGame() {
  store.game = {
    strokes: 0,
    startTime: moment(),
    actualGameTime:
      store.config &&
      getRandomInclusiveInteger(
        store.config.minimumGameTime,
        store.config.maximumGameTime
      ),
    bookmarks: [],
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

    edging: false,
    ruining: false,
  };
}
