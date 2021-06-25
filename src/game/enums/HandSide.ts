const HandSideString = {
  0: "right",
  1: "left",
};

const HandSideEnum = {
  rightHandSide: 0,
  leftHandSide: 1,
};

const HandSideStringArray = Object.entries(HandSideString);

const HandSideArray = Object.entries(HandSideEnum);

export const getRandomLeftOrRight = () => {
  return HandSideStringArray[
    Math.floor(Math.random() * HandSideArray.length)
  ][1];
};
