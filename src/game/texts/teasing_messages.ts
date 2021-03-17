import { getRandomMessage } from "./messages";

export const getRandomPunishmentMessage = () => {
  return getRandomMessage(punishmentMessages);
};

const punishmentMessages = [
  "You looser!",
  "You are disgusting",
  "You are not worth it anyway",
  "You are not even up for the simple tasks",
  "Then you shall be punished",
  "Then you shall receive nothing, but punishment!",
  "Things are about to get much more difficult for you",
];

/* ########################################### //
                 Encouragements 
// ########################################### */
export const getRandomYouDidGoodMessage = () => {
  return getRandomMessage(youDidGoodMessages);
};

const youDidGoodMessages = [
  "You did a very good job today",
  "Thank you for that very interesting time with you, hope to see you soon",
  "I hope you like the time you had with me, see you next time!",
];
