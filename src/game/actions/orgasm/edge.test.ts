import store from "@/store";
import * as strokeSpeed from "@/game/utils/strokeSpeed";
import * as notification from "@/game/engine/notification";
import * as audio from "@/game/engine/audio";

import { getToTheEdge, rideTheEdge, edged } from "./edge";

const setStrokeSpeed = jest.spyOn(strokeSpeed, "setStrokeSpeed");
const createNotification = jest.spyOn(notification, "createNotification");
const dismissNotification = jest.spyOn(notification, "dismissNotification");
const playCommand = jest.spyOn(audio, "playCommand");

jest.mock("@/game/actions");

// eslint-disable-next-line jest/no-disabled-tests
describe.skip("Edge Tests", () => {
  it("Should ride the edge for the specified duration", async () => {
    const duration = 1_000;

    const rideTheEdgePromise = rideTheEdge(duration);
    jest.advanceTimersByTime(duration);

    await rideTheEdgePromise;

    expect(setStrokeSpeed).toBeCalledWith(3.2);
    expect(createNotification).toBeCalledTimes(1);
    expect(dismissNotification).toBeCalledTimes(1);
    expect(playCommand).toBeCalledTimes(1);
  });

  it("Edged should increment the edge counter", async () => {
    await edged();

    expect(store.game.edges).toBe(1);
  });

  it("Should get to the edge", async () => {
    const edging = jest.fn();

    const getToTheEdgePromise = getToTheEdge(edging);

    expect(setStrokeSpeed).toBeCalledWith(store.config.strokeSpeed.max);

    jest.runOnlyPendingTimers();

    // TODO:
    // Mock out services

    const triggers = await getToTheEdgePromise;

    expect(triggers.length).toBe(2);

    const [edgingTrigger, cantEdgeTrigger] = triggers;
    expect(edgingTrigger.label).toBe("Edging");
    expect(cantEdgeTrigger.label).toBe("I can't");

    edgingTrigger();

    expect(edging).toBeCalled();
  });
});
