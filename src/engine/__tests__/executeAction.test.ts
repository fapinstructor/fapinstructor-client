/* eslint-disable @typescript-eslint/no-empty-function */
import { ActionService } from "game/xstate/services";

const done = async () => {};

const actionWithTriggerArray = async () => {
  return [done];
};

const actionWithSingleTrigger = async () => {
  return done;
};

const action = async () => {};

describe("execute action tests", () => {
  beforeEach(() => {
    ActionService.initialize();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should execute an action", async () => {
    jest.useFakeTimers();

    const executingAction = ActionService.execute(action);

    expect(ActionService.executing).toBeTruthy();
    expect(ActionService.triggers).toBeNull();

    await executingAction;
    expect(jest.getTimerCount()).toBe(0);

    expect(ActionService.executing).toBeFalsy();
    expect(ActionService.triggers).toBeNull();
  });

  it("should execute an action with an array of triggers", async () => {
    jest.useFakeTimers();

    const executingAction = ActionService.execute(actionWithTriggerArray);

    expect(ActionService.executing).toBeTruthy();
    expect(ActionService.triggers).toBeNull();

    await executingAction;
    jest.runOnlyPendingTimers();

    expect(ActionService.executing).toBeFalsy();
    expect(ActionService.triggers).toBeTruthy();
    // @ts-expect-error Shouldn't be undefined
    expect(ActionService.triggers[0]).toEqual(done);
  });

  it("should execute an action with a single trigger", async () => {
    jest.useFakeTimers();

    const executingAction = ActionService.execute(actionWithSingleTrigger);

    expect(ActionService.executing).toBeTruthy();
    expect(ActionService.triggers).toBeNull();

    await executingAction;
    jest.runOnlyPendingTimers();

    expect(ActionService.executing).toBeFalsy();
    expect(ActionService.triggers).toBeTruthy();
    // @ts-expect-error Shouldn't be undefined
    expect(ActionService.triggers[0]).toEqual(done);
  });
});
