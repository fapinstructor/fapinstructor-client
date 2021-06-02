import { combineReducers } from "redux";

import notifications from "./notifications";
import currentUser from "./currentUser";
import currentGame from "./currentGame";
import createGame from "./createGame";
import tags from "./tags";
import games from "./games";
import settings from "./settings";

export const rootReducer = combineReducers({
  settings,
  notifications,
  currentUser,
  currentGame,
  createGame,
  tags,
  games,
});

export type State = ReturnType<typeof rootReducer>;

export default rootReducer;
