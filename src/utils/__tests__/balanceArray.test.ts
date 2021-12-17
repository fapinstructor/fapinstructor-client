import balanceArray from "../balanceArray";

describe("balance array tests", () => {
  it("Should balance array with even element values.", () => {
    const unbalancedArray = [50, 25, 25];
    const index = 0;
    const adjustBy = 50;

    const balancedArray = balanceArray(index, adjustBy, unbalancedArray);

    expect(balancedArray).toEqual([100, 0, 0]);
  });

  it("Should balance array with even elements with a negative number.", () => {
    const unbalancedArray = [50, 25, 25];
    const index = 0;
    const adjustBy = -50;

    const balancedArray = balanceArray(index, adjustBy, unbalancedArray);

    expect(balancedArray).toEqual([0, 50, 50]);
  });

  it("Should balance array with uneven elements with a negative number.", () => {
    const unbalancedArray = [50, 30, 20];
    const index = 0;
    const adjustBy = -50;

    const balancedArray = balanceArray(index, adjustBy, unbalancedArray);

    expect(balancedArray).toEqual([0, 55, 45]);
  });

  it("Should balance array with uneven element.", () => {
    const unbalancedArray = [50, 30, 20];
    const index = 0;
    const adjustBy = 50;

    const balancedArray = balanceArray(index, adjustBy, unbalancedArray);

    expect(balancedArray).toEqual([100, 0, 0]);
  });

  it("Should balance array with decimals.", () => {
    const unbalancedArray = [81.5, 0.5, 18];
    const index = 0;
    const adjustBy = 18.5;

    const balancedArray = balanceArray(index, adjustBy, unbalancedArray);

    expect(balancedArray).toEqual([100, 0, 0]);
  });

  it("Should balance array when there are completed indexes.", () => {
    const unbalancedArray = [99, 1, 0];
    const index = 2;
    const adjustBy = 91;

    const balancedArray = balanceArray(index, adjustBy, unbalancedArray);

    expect(balancedArray).toEqual([9, 0, 91]);
  });
});
