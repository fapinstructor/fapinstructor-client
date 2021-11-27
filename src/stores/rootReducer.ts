import { combineReducers } from "redux";

import notifications from "./notifications";
// eslint-disable-next-line import/no-named-as-default
import currentUser from "./currentUser";
import settings from "./settings";

export const rootReducer = combineReducers({
  settings,
  notifications,
  currentUser,
});

export type State = ReturnType<typeof rootReducer>;
