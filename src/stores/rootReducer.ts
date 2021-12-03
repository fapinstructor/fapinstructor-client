import { combineReducers } from "redux";

import notifications from "./notifications";
import settings from "./settings";

export const rootReducer = combineReducers({
  settings,
  notifications,
});

export type State = ReturnType<typeof rootReducer>;
