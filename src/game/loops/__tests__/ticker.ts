// import faker from "faker";
import ticker from "../ticker";
import { strokeEmitterObservable } from "../strokeEmitter";
import store from "store";
import { playTick } from "engine/audio";
import { TIME_DELAY } from "components/organisms/BeatMeter/settings";
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

    store.localStorage.enableTicks = true;
    // @ts-expect-error Other fields aren't relevant
    store.config = {
      slowestStrokeSpeed: 0,
      fastestStrokeSpeed: 0,
    };

    StrokeService.initialize(store.config);
    StrokeService.setStrokeSpeed(1000);
  });

  it("should execute appropriate amount of ticks", () => {
    const delay = TIME_DELAY / 2;

    ticker({ timestamp: timestamp + delay, progress: 0 });
    ticker({ timestamp: timestamp + 999 + delay, progress: 0 });
    expect(playTick).toHaveBeenCalledTimes(0);

    ticker({ timestamp: timestamp + 1000 + delay, progress: 0 }); // tick
    expect(playTick).toHaveBeenCalledTimes(1);

    ticker({ timestamp: timestamp + 2000 + delay, progress: 0 }); // tick
    expect(playTick).toHaveBeenCalledTimes(2);

    ticker({ timestamp: timestamp + 3000 + delay, progress: 0 }); // tick
    expect(playTick).toHaveBeenCalledTimes(3);

    ticker({ timestamp: timestamp + 3999 + delay, progress: 0 });
    expect(playTick).toHaveBeenCalledTimes(3);
  });
});
