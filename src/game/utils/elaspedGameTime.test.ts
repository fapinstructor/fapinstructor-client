import elapsedGameTime, { gameCompletionPercent } from "./elapsedGameTime";
import store from "store";
import moment from "moment";

describe("Elapsed game time", () => {
  it("game completion should be 0%", () => {
    store.game.startTime = moment();

    const completionPercent = gameCompletionPercent();

    expect(completionPercent).toBe(0);
  });

  it("game completion should be 50%", () => {
    const time = store.config.maximumGameTime / 2;

    store.game.startTime = moment().subtract(time, "minutes");

    const completionPercent = gameCompletionPercent();

    expect(completionPercent).toBe(0.5);
  });

  it("game completion should be 100%", () => {
    const time = store.config.maximumGameTime;

    store.game.startTime = moment().subtract(time, "minutes");

    const completionPercent = gameCompletionPercent();

    expect(completionPercent).toBe(1);
  });

  it("elapsed game time should be half the maximum time", () => {
    const time = store.config.maximumGameTime / 2;

    store.game.startTime = moment().subtract(time, "minutes");

    expect(elapsedGameTime("minutes")).toBe(time);
  });
});
