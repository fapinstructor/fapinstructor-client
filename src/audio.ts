import { getRandomInclusiveInteger } from "utils/math";

import CEI1 from "audio/cei/1.mp3";
import CEI2 from "audio/cei/2.mp3";
import CEI3 from "audio/cei/3.mp3";
// denied
import Denied1 from "audio/denied/1.mp3";
// faster
import Faster1 from "audio/faster/1.mp3";
import Faster2 from "audio/faster/2.mp3";
// moan
import Moan1 from "audio/moan/1.mp3";
import Moan2 from "audio/moan/2.mp3";
import Moan3 from "audio/moan/3.mp3";
import Moan4 from "audio/moan/4.mp3";
import Moan5 from "audio/moan/5.mp3";
import Moan6 from "audio/moan/6.mp3";
import Moan7 from "audio/moan/7.mp3";
import Moan8 from "audio/moan/8.mp3";
import Moan9 from "audio/moan/9.mp3";
import Moan10 from "audio/moan/10.mp3";
import Moan11 from "audio/moan/11.mp3";
import Moan12 from "audio/moan/12.mp3";
import Moan13 from "audio/moan/13.mp3";
import Moan14 from "audio/moan/14.mp3";
import Moan15 from "audio/moan/15.mp3";
import Moan16 from "audio/moan/16.mp3";
import Moan17 from "audio/moan/17.mp3";
import Moan18 from "audio/moan/18.mp3";
import Moan19 from "audio/moan/19.mp3";
import Moan20 from "audio/moan/20.mp3";
import Moan21 from "audio/moan/21.mp3";
import Moan22 from "audio/moan/22.mp3";
import Moan23 from "audio/moan/23.mp3";
import Moan24 from "audio/moan/24.mp3";
// orgasm
import Orgasm1 from "audio/orgasm/1.mp3";
import Orgasm2 from "audio/orgasm/2.mp3";
import Orgasm3 from "audio/orgasm/3.mp3";
// ruined
import Ruined1 from "audio/ruined/1.mp3";
import Ruined2 from "audio/ruined/2.mp3";
import Ruined3 from "audio/ruined/3.mp3";
// misc.
import CardShuffle from "audio/cardshuffle.mp3";
import DontCumYet from "audio/dontcumyet.mp3";
import Edge from "audio/edge.mp3";
import HoldEdge from "audio/holdedge.mp3";
import KeepStroking from "audio/keep_stroking.mp3";
import LongMoan from "audio/longMoan.mp3";
import Obey from "audio/obey.mp3";
import RuinItForMe from "audio/ruinitforme.mp3";
import SlapBalls from "audio/slapballs.mp3";
import SqueezeBalls from "audio/squeezeballs.mp3";
import StartStrokingAgain from "audio/start_stroking_again.mp3";
import StartGame from "audio/startgame.mp3";
import Tick from "audio/tick.mp3";
import Tighter from "audio/tighter.mp3";

const audioLibrary = {
  cei: [CEI1, CEI2, CEI3],
  denied: [Denied1],
  faster: [Faster1, Faster2],
  moan: [
    Moan1,
    Moan2,
    Moan3,
    Moan4,
    Moan5,
    Moan6,
    Moan7,
    Moan8,
    Moan9,
    Moan10,
    Moan11,
    Moan12,
    Moan13,
    Moan14,
    Moan15,
    Moan16,
    Moan17,
    Moan18,
    Moan19,
    Moan20,
    Moan21,
    Moan22,
    Moan23,
    Moan24,
  ],
  longMoan: [LongMoan],
  edge: [Edge],
  orgasm: [Orgasm1, Orgasm2, Orgasm3],
  ruin: [RuinItForMe],
  ruined: [Ruined1, Ruined2, Ruined3],
  dontCum: [DontCumYet],
  shuffle: [CardShuffle],
  holdEdge: [HoldEdge],
  keepStroking: [KeepStroking],
  startStroking: [StartStrokingAgain],
  tighter: [Tighter],
  obey: [Obey],
  slapBalls: [SlapBalls],
  squeezeBalls: [SqueezeBalls],
  startGame: [StartGame],
  tick: [Tick],
};

export type Audios = keyof typeof audioLibrary;

export default function getAudioUrl(key: Audios) {
  const variations = audioLibrary[key];
  const chosenVariation =
    variations[getRandomInclusiveInteger(0, variations.length - 1)];

  return chosenVariation;
}
