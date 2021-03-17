/* eslint-disable @typescript-eslint/no-empty-function */
import executeAction from "../executeAction";
import store from "store";

const done = async () => {};

const actionWithTriggerArray = async () => {
  return [done];
};

const actionWithSingleTrigger = async () => {
  return done;
};

const action = async () => {};

describe("executeAction tests", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("should execute an action", async () => {
    jest.useFakeTimers();

    const executingAction = executeAction(action);

    expect(store.engine.executing).toBeTruthy();
    expect(store.engine.actionTriggers).toBeNull();

    await executingAction;
    expect(jest.getTimerCount()).toBe(0);

    expect(store.engine.executing).toBeFalsy();
    expect(store.engine.actionTriggers).toBeNull();
  });

  it("should execute an action with an array of triggers", async () => {
    jest.useFakeTimers();

    const executingAction = executeAction(actionWithTriggerArray);

    expect(store.engine.executing).toBeTruthy();
    expect(store.engine.actionTriggers).toBeNull();

    await executingAction;
    jest.runOnlyPendingTimers();

    expect(store.engine.executing).toBeFalsy();
    expect(store.engine.actionTriggers).toBeTruthy();
    // @ts-expect-error Shouldn't be undefined
    expect(store.engine.actionTriggers[0]).toEqual(done);
  });

  it("should execute an action with a single trigger", async () => {
    jest.useFakeTimers();

    const executingAction = executeAction(actionWithSingleTrigger);

    expect(store.engine.executing).toBeTruthy();
    expect(store.engine.actionTriggers).toBeNull();

    await executingAction;
    jest.runOnlyPendingTimers();

    expect(store.engine.executing).toBeFalsy();
    expect(store.engine.actionTriggers).toBeTruthy();
    // @ts-expect-error Shouldn't be undefined
    expect(store.engine.actionTriggers[0]).toEqual(done);
  });
});
