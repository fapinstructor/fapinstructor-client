/**
 * Summary: Indicates the probability the supplied function will execute.
 *
 * Description: Groups a function and a probability together.
 *
 * @since      06.07.2018
 *
 * @alias    createProbability
 * @memberof utils
 *
 * @param {Function}   func          The function "func"
 * @param {Number}     probability   with the probability "probability"
 *
 */
export default (func: () => void, probability: number) => ({
  func,
  probability,
});
