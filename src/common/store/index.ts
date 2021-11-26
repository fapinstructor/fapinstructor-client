import { configureStore, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import throttle from "lodash/throttle";

import { storage } from "@/utils/storage";
import { Settings } from "@/types/Settings";

import { rootReducer, State } from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    settings: storage.getItem<Settings>("settings"),
  },
});

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const newRootReducer = require("./rootReducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;
export type AppThunk<T = void> = ThunkAction<T, State, unknown, Action<string>>;

store.subscribe(
  throttle(() => {
    storage.setItem("settings", store.getState().settings);
  }, 1000)
);

export default store;
