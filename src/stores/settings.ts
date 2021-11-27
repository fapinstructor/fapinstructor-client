import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Settings } from "@/types/Settings";

import { State } from "./rootReducer";

const initialState: Settings = {
  voice: true,
  moans: true,
  ticks: true,
  beatMeter: true,
  videoAudio: true,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleSetting(state, action: PayloadAction<keyof Settings>) {
      state[action.payload] = !state[action.payload];
    },
  },
});

export const selectSettings = (state: State) => state.settings;

export const { toggleSetting } = settingsSlice.actions;

export default settingsSlice.reducer;
