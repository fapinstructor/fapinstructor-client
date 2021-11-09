import { subMinutes, formatISO } from "date-fns";

import store from "@/store";

import elapsedGameTime, { gameCompletionPercent } from "./elapsedGameTime";



jest.mock("@/store");

describe("Elapsed game time", () => {
  it("game completion should be 0%", () => {
    store.game.startTime = formatISO(new Date());

    const completionPercent = gameCompletionPercent();

    expect(completionPercent).toBe(0);
  });

  it("game completion should be 50%", () => {
    const time = store.config.gameDuration.max / 2;

    store.game.startTime = formatISO(subMinutes(new Date(), time));

    const completionPercent = gameCompletionPercent();

    expect(completionPercent).toBe(0.5);
  });

  it("game completion should be 100%", () => {
    const time = store.config.gameDuration.max;

    store.game.startTime = formatISO(subMinutes(new Date(), time));

    const completionPercent = gameCompletionPercent();

    expect(completionPercent).toBe(1);
  });

  it("elapsed game time should be half the maximum time", () => {
    const time = store.config.gameDuration.max / 2;

    store.game.startTime = formatISO(subMinutes(new Date(), time));

    expect(elapsedGameTime()).toBe(time);
  });
});
