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

  // Keep track and skip any indexes that can no longer be adjusted.
  const ignoredIndexes: number[] = [adjustIndex];

  // Subtract the adjustment amount from the other elements.
  let remainder = adjustBy;

  while (remainder !== 0) {
    const previousRemainder = remainder;

    // Evenly split the total adjustment across all indexes.
    const splitAdjustBy =
      remainder / (balancedArray.length - ignoredIndexes.length);

    for (let i = 0; i < balancedArray.length; i++) {
      // Skip over any ignored indexes.
      if (ignoredIndexes.includes(i)) {
        continue;
      }

      const originalValue = balancedArray[i];
      const newValue = Math.max(originalValue - splitAdjustBy, 0);
      const adjustedAmount = originalValue - newValue;
      const unusedAmount = splitAdjustBy - adjustedAmount;

      // Apply the adjusted value to the index
      balancedArray[i] = newValue;

      // Subtract the amount adjusted from the remainder.
      remainder -= adjustedAmount;

      if (unusedAmount > 0) {
        // An unused amount means that we can no longer adjust this index.  Add it to the ignore list.
        ignoredIndexes.push(i);
      }
    }

    if (previousRemainder === remainder) {
      throw new Error(
        `The remainder '${remainder}' as index '${adjustIndex}' wasn't adjusted by '${adjustBy}'' after iterating through the array '${balancedArray}' starting with the unbalanced array of '${unbalancedArray}'`
      );
    }
  }

  return balancedArray;
}
