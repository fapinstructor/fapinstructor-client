import * as math from "../math";

describe("test math", () => {
  it("should round up to the specified decimal places", () => {
    expect(math.round(1.23456, 3)).toBe(1.235);
  });

  it("should round down to the specified decimal places", () => {
    expect(math.round(1.23436, 3)).toBe(1.234);
  });

  it("Should return a random number between the range 1 and 2", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.5);

    expect(math.getRandomArbitrary(1, 2)).toBe(1.5);

    jest.spyOn(global.Math, "random").mockRestore();
  });

  it("Should return a random integer inclusively between the range 1 and 2", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.5);

    expect(math.getRandomInclusiveInteger(1, 2)).toBe(2);

    jest.spyOn(global.Math, "random").mockRestore();
  });

  it("Should sum an array of integers", () => {
    const actual = math.sum([1, 2, 3]);

    expect(actual).toBe(6);
  });
});
