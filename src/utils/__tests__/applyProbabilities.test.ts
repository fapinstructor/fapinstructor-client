import type { Hash } from "@/types/Hash";

import applyProbabilities from "../applyProbabilities";

function count(items: string[]) {
  const frequency: Hash<number> = {};

  items.forEach((item) => {
    if (!frequency[item]) {
      frequency[item] = 0;
    }
    frequency[item] += +1;
  });

  return frequency;
}

describe("Apply probabilities", () => {
  it("Applying 100% probability should return 100 items", () => {
    const result = applyProbabilities([["A", 100]]);

    expect(result.length).toBe(100);
  });

  it("Two items with the same probability should return the same number of items", () => {
    const items = applyProbabilities([
      ["A", 50],
      ["B", 50],
    ]);

    expect(items.length).toBe(100);

    const frequency = count(items);

    expect(frequency["A"]).toBe(50);
    expect(frequency["B"]).toBe(50);
  });

  it("Threes items with different probabilities should return the same number of items", () => {
    const items = applyProbabilities([
      ["A", 25],
      ["B", 25],
      ["C", 50],
    ]);

    expect(items.length).toBe(100);

    const frequency = count(items);

    expect(frequency["A"]).toBe(25);
    expect(frequency["B"]).toBe(25);
    expect(frequency["C"]).toBe(50);
  });
});
