import memoize from "../memoize";

describe("Memoize tests", () => {
  it("Should return the same value if called the second time with the same arg", () => {
    let counter = 0;

    const calculate = () => counter++;

    const calculateMemo = memoize(calculate);

    expect(calculateMemo("A")).toBe(0);
    expect(calculateMemo("A")).toBe(0);
    expect(calculateMemo("B")).toBe(1);
  });
});
