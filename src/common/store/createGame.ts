import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "common/api/client";
import { State } from "common/store/rootReducer";
import {
  CreateGameRequest,
  CreateGameResponse,
} from "common/api/schemas/games";

type CreateGameState = {
  loading: boolean;
  error?: string;
  gameId: string | null;
};

const initialState: CreateGameState = {
  loading: false,
  gameId: null,
};

export const createGame = createAsyncThunk(
  `game/create`,
  async (values: CreateGameRequest, { getState, rejectWithValue }) => {
    const response = await api.post<CreateGameResponse>("/v1/games", values);
    return response.data;
  }
);

export const createGameSlice = createSlice({
  name: "createGame",
  initialState,
  reducers: {
    clearGameId: (state: CreateGameState) => {
      state.gameId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGame.pending, (state, action) => {
        if (!state.loading) {
          state.loading = true;
        }
      })
      .addCase(createGame.fulfilled, (state, action) => {
        if (state.loading) {
          state.loading = false;
          state.gameId = action.payload.id;
        }
      })
      .addCase(createGame.rejected, (state, action) => {
        if (state.loading) {
          state.loading = false;
          state.error = action.error.message;
        }
      });
  },
});

export const selectGameId = (state: State) => state.createGame.gameId;

export const { clearGameId } = createGameSlice.actions;

export default createGameSlice.reducer;
