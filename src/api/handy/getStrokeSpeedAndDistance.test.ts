import getStrokeSpeedAndDistance, {
  maxStrokeLength,
  maxStrokeSpeed,
} from "./getStrokeSpeedAndDistance";

describe("getStrokeSpeedAndDistance", () => {
  it("should work for 8 bps", () => {
    const { speed, stroke } = getStrokeSpeedAndDistance(8);

    expect(speed).toBe(maxStrokeSpeed);
    expect(stroke).toBeCloseTo(24.38);
  });

  it("should work for 7 bps", () => {
    const { speed, stroke } = getStrokeSpeedAndDistance(7);

    expect(speed).toBe(maxStrokeSpeed);
    expect(stroke).toBeCloseTo(27.86);
  });

  it("should work for 6 bps", () => {
    const { speed, stroke } = getStrokeSpeedAndDistance(6);

    expect(speed).toBe(maxStrokeSpeed);
    expect(stroke).toBeCloseTo(32.5);
  });

  it("should work for 5 / sec", () => {
    const { speed, stroke } = getStrokeSpeedAndDistance(5);

    expect(speed).toBe(maxStrokeSpeed);
    expect(stroke).toBeCloseTo(39);
  });

  it("should work for 4 / sec", () => {
    const { speed, stroke } = getStrokeSpeedAndDistance(4);

    expect(speed).toBe(maxStrokeSpeed);
    expect(stroke).toBeCloseTo(48.75);
  });

  it("should work for 3 / sec", () => {
    const { speed, stroke } = getStrokeSpeedAndDistance(3);

    expect(speed).toBe(maxStrokeSpeed);
    expect(stroke).toBeCloseTo(65);
  });

  it("should work for 2 / sec", () => {
    const { speed, stroke } = getStrokeSpeedAndDistance(2);

    expect(speed).toBeCloseTo(390);
    expect(stroke).toBe(maxStrokeLength);
  });

  it("should work for 1 / sec", () => {
    const { speed, stroke } = getStrokeSpeedAndDistance(1);

    expect(speed).toBeCloseTo(195);
    expect(stroke).toBe(maxStrokeLength);
  });

  it("should work for 1 / 2 sec", () => {
    const { speed, stroke } = getStrokeSpeedAndDistance(1 / 2);

    expect(speed).toBeCloseTo(97.5);
    expect(stroke).toBe(maxStrokeLength);
  });

  it("should work for 1 / 3 sec", () => {
    const { speed, stroke } = getStrokeSpeedAndDistance(1 / 3);

    expect(speed).toBeCloseTo(65);
    expect(stroke).toBe(maxStrokeLength);
  });

  it("should work for 1 / 4 sec", () => {
    const { speed, stroke } = getStrokeSpeedAndDistance(1 / 4);

    expect(speed).toBeCloseTo(48.75);
    expect(stroke).toBe(maxStrokeLength);
  });
});
