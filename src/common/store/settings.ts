import { createSlice } from "@reduxjs/toolkit";

import { State } from "./rootReducer";

type Settings = {
  enableVoice: boolean;
  enableMoans: boolean;
  enableTicks: boolean;
  enableBeatMeter: boolean;
  enableVideoAudio: boolean;
};

const initialState: Settings = {
  enableVoice: true,
  enableMoans: true,
  enableTicks: true,
  enableBeatMeter: true,
  enableVideoAudio: true,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleVoice: (state) => {
      state.enableVoice = !state.enableVoice;
    },
    toggleMoans: (state) => {
      state.enableMoans = !state.enableMoans;
    },
    toggleTicks: (state) => {
      state.enableTicks = !state.enableTicks;
    },
    toggleBeatMeter: (state) => {
      state.enableBeatMeter = !state.enableBeatMeter;
    },
    toggleVideoAudio: (state) => {
      state.enableVideoAudio = !state.enableVideoAudio;
    },
  },
});

export const selectEnableVoice = (state: State) => state.settings.enableVoice;
export const selectEnableMoans = (state: State) => state.settings.enableMoans;
export const selectEnableTicks = (state: State) => state.settings.enableTicks;
export const selectEnableBeatMeter = (state: State) =>
  state.settings.enableBeatMeter;
export const selectEnableVideoAudio = (state: State) =>
  state.settings.enableVideoAudio;

export const {
  toggleVoice,
  toggleMoans,
  toggleTicks,
  toggleBeatMeter,
  toggleVideoAudio,
} = settingsSlice.actions;

export default settingsSlice.reducer;
