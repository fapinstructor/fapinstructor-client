/**
 * Balances an array by adjusting the specified index and taking the remainder
 * and splitting it across the sibling elements.
 *
 * @param adjustIndex The index to adjust.
 * @param adjustBy The adjustment made to the specified index.
 * @param unbalancedArray The array that contains both the value
 * being adjusted and other elements that will gain or lose the adjusted
 * value.
 *
 * @returns The balanced array.
 */
export default function balanceArray(
  adjustIndex: number,
  adjustBy: number,
  unbalancedArray: number[]
) {
  const balancedArray = [...unbalancedArray];

  // Adjust the specified index.
  balancedArray[adjustIndex] += adjustBy;

  // Evenly split the total adjustment across all elements.
  const elementAdjustment = adjustBy / (balancedArray.length - 1);

  // Subtract the adjustment amount from the other elements.
  let remainder = adjustBy;
  while (remainder !== 0) {
    const previousRemainder = remainder;

    for (let i = 0; i < balancedArray.length; i++) {
      // Skip the adjustIndex since we've already made the change manually.
      if (i === adjustIndex) {
        continue;
      }

      const originalValue = balancedArray[i];
      const adjustedValue = Math.max(originalValue - elementAdjustment, 0);

      // Apply the adjusted value to the index
      balancedArray[i] = adjustedValue;

      // Subtract the amount adjusted from the remainder.
      remainder -= originalValue - adjustedValue;
    }

    if (previousRemainder === remainder) {
      throw new Error(
        `The remainder '${remainder}' as index '${adjustIndex}' wasn't adjusted by '${adjustBy}'' after iterating through the array '${balancedArray}'`
      );
    }
  }

  return balancedArray;
}
