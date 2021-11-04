import { getRandomInclusiveInteger } from "@/utils/math";

function getRandomDuration(min: number, max: number) {
  return getRandomInclusiveInteger(min, max) * 1000;
}

export default getRandomDuration;
