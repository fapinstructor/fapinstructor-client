import getStrokeSpeedAndDistance, {
  maxStrokeLength,
  maxStrokeSpeed,
} from "./getStrokeSpeedAndDistance";

describe("getStrokeSpeedAndDistance", () => {
  it("should work for 8 bps", () => {
    const { speed, stroke, strokeZone } = getStrokeSpeedAndDistance(8);

    expect(speed).toBe(maxStrokeSpeed);
    expect(stroke).toBeCloseTo(50);
    expect(strokeZone).toEqual({ min: 74, max: 100 });
  });

  it("should work for 7 bps", () => {
    const { speed, stroke, strokeZone } = getStrokeSpeedAndDistance(7);

    expect(speed).toBe(maxStrokeSpeed);
    expect(stroke).toBeCloseTo(57);
    expect(strokeZone).toEqual({ min: 70 max: 100 });
  });

  it("should work for 6 bps", () => {
    const { speed, stroke, strokeZone } = getStrokeSpeedAndDistance(6);

    expect(speed).toBe(maxStrokeSpeed);
    expect(stroke).toBeCloseTo(66);
    expect(strokeZone).toEqual({ min: 65, max: 100 });
  });

  it("should work for 5 / sec", () => {
    const { speed, stroke, strokeZone } = getStrokeSpeedAndDistance(5);

    expect(speed).toBe(maxStrokeSpeed);
    expect(stroke).toBeCloseTo(80);
    expect(strokeZone).toEqual({ min: 58, max: 100 });
  });

  it("should work for 4 / sec", () => {
    const { speed, stroke, strokeZone } = getStrokeSpeedAndDistance(4);

    expect(speed).toBe(maxStrokeSpeed);
    expect(stroke).toBeCloseTo(100);
    expect(strokeZone).toEqual({ min: 48, max: 100 });
  });

  it("should work for 3 / sec", () => {
    const { speed, stroke, strokeZone } = getStrokeSpeedAndDistance(3);

    expect(speed).toBe(maxStrokeSpeed);
    expect(stroke).toBeCloseTo(133);
    expect(strokeZone).toEqual({ min: 31, max: 100 });
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
