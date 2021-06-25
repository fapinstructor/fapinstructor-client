import ticker from "../ticker";
import { strokeEmitterObservable } from "../strokeEmitter";
import store from "store";
import { playTick } from "engine/audio";
import { TIME_TO_TICK } from "components/organisms/BeatMeter/settings";
import { StrokeService } from "game/xstate/services";

jest.mock("engine/audio");

const timestamp = 1600000000000;

describe("test ticker", () => {
  beforeEach(() => {
    const strokeTimes = [1000, 2000, 3000, 4000];

    strokeTimes.forEach((strokeTime) => {
      strokeEmitterObservable.notify({
        type: "emit",
        strokeTime: timestamp + strokeTime,
      });
    });

    // @ts-expect-error Other fields aren't relevant
    store.config = {
      slowestStrokeSpeed: 0,
      fastestStrokeSpeed: 0,
    };

    StrokeService.initialize(store.config);
    StrokeService.setStrokeSpeed(1000);
  });

  it("should execute appropriate amount of ticks", () => {
    ticker({ timestamp: timestamp + TIME_TO_TICK, progress: 0 });
    ticker({ timestamp: timestamp + 999 + TIME_TO_TICK, progress: 0 });
    expect(playTick).toHaveBeenCalledTimes(0);

    ticker({ timestamp: timestamp + 1000 + TIME_TO_TICK, progress: 0 }); // tick
    expect(playTick).toHaveBeenCalledTimes(1);

    ticker({ timestamp: timestamp + 2000 + TIME_TO_TICK, progress: 0 }); // tick
    expect(playTick).toHaveBeenCalledTimes(2);

    ticker({ timestamp: timestamp + 3000 + TIME_TO_TICK, progress: 0 }); // tick
    expect(playTick).toHaveBeenCalledTimes(3);

    ticker({ timestamp: timestamp + 3999 + TIME_TO_TICK, progress: 0 });
    expect(playTick).toHaveBeenCalledTimes(3);
  });
});
