/**
 * If an item has a probability > 1, we duplicate it to give it the appropriate probability.
 * Example:
 * [a, b, c, d]
 * [1, 2, 1, 3]
 * [a, b, b, c, d, d, d]
 */
export default function applyProbabilities<T>(probabilities: [T, number][]) {
  const appliedProbabilities: T[] = [];

  probabilities.forEach(([t, probability]) => {
    for (let i = 0; i < probability; i++) {
      appliedProbabilities.push(t);
    }
  });

  return appliedProbabilities;
}
