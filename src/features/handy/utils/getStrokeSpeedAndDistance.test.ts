import getStrokeSpeedAndDistance, {
  maxStrokeLength,
  maxStrokeSpeed,
} from "./getStrokeSpeedAndDistance";

describe("getStrokeSpeedAndDistance", () => {
  it("should work for 8 bps", () => {
    const { speed, stroke, strokeZone } = getStrokeSpeedAndDistance(8);

    expect(speed).toBe(maxStrokeSpeed);
    expect(stroke).toBeCloseTo(24);
    expect(strokeZone).toEqual({ min: 87, max: 100 });
  });

  it("should work for 7 bps", () => {
    const { speed, stroke, strokeZone } = getStrokeSpeedAndDistance(7);

    expect(speed).toBe(maxStrokeSpeed);
    expect(stroke).toBeCloseTo(27);
    expect(strokeZone).toEqual({ min: 85, max: 100 });
  });

  it("should work for 6 bps", () => {
    const { speed, stroke, strokeZone } = getStrokeSpeedAndDistance(6);

    expect(speed).toBe(maxStrokeSpeed);
    expect(stroke).toBeCloseTo(32);
    expect(strokeZone).toEqual({ min: 83, max: 100 });
  });

  it("should work for 5 / sec", () => {
    const { speed, stroke, strokeZone } = getStrokeSpeedAndDistance(5);

    expect(speed).toBe(maxStrokeSpeed);
    expect(stroke).toBeCloseTo(39);
    expect(strokeZone).toEqual({ min: 80, max: 100 });
  });

  it("should work for 4 / sec", () => {
    const { speed, stroke, strokeZone } = getStrokeSpeedAndDistance(4);

    expect(speed).toBe(maxStrokeSpeed);
    expect(stroke).toBeCloseTo(48);
    expect(strokeZone).toEqual({ min: 75, max: 100 });
  });

  it("should work for 3 / sec", () => {
    const { speed, stroke, strokeZone } = getStrokeSpeedAndDistance(3);

    expect(speed).toBe(maxStrokeSpeed);
    expect(stroke).toBeCloseTo(65);
    expect(strokeZone).toEqual({ min: 66, max: 100 });
  });

  it("should work for 2 / sec", () => {
    const { speed, stroke, strokeZone } = getStrokeSpeedAndDistance(2);

    expect(speed).toBeCloseTo(390);
    expect(stroke).toBe(maxStrokeLength);
    expect(strokeZone).toEqual({ min: 0, max: 100 });
  });

  it("should work for 1 / sec", () => {
    const { speed, stroke, strokeZone } = getStrokeSpeedAndDistance(1);

    expect(speed).toBeCloseTo(195);
    expect(stroke).toBe(maxStrokeLength);
    expect(strokeZone).toEqual({ min: 0, max: 100 });
  });

  it("should work for 1 / 2 sec", () => {
    const { speed, stroke, strokeZone } = getStrokeSpeedAndDistance(1 / 2);

    expect(speed).toBeCloseTo(97);
    expect(stroke).toBe(maxStrokeLength);
    expect(strokeZone).toEqual({ min: 0, max: 100 });
  });

  it("should work for 1 / 3 sec", () => {
    const { speed, stroke, strokeZone } = getStrokeSpeedAndDistance(1 / 3);

    expect(speed).toBeCloseTo(65);
    expect(stroke).toBe(maxStrokeLength);
    expect(strokeZone).toEqual({ min: 0, max: 100 });
  });

  it("should work for 1 / 4 sec", () => {
    const { speed, stroke, strokeZone } = getStrokeSpeedAndDistance(1 / 4);

    expect(speed).toBeCloseTo(48);
    expect(stroke).toBe(maxStrokeLength);
    expect(strokeZone).toEqual({ min: 0, max: 100 });
  });
});
