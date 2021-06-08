import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "common/api/client";
import { AppThunk } from "common/store";
import { State } from "common/store/rootReducer";
import { createNotification, Severity } from "common/store/notifications";
import {
  CreateGameRequest,
  CreateGameResponse,
} from "common/api/schemas/games";

interface CreateGameState {
  loading: boolean;
  error: string | null;
}

const initialState: CreateGameState = {
  loading: false,
  error: null,
};

export const createGameSlice = createSlice({
  name: "createGame",
  initialState,
  reducers: {
    setLoading: (state: CreateGameState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const selectLoading = (state: State) => state.createGame.loading;

export const { setLoading } = createGameSlice.actions;

export default createGameSlice.reducer;

export const createGame =
  (values: CreateGameRequest): AppThunk<Promise<CreateGameResponse>> =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const { data } = await api.post<CreateGameResponse>("/v1/games", values);
      return data;
    } catch (err) {
      dispatch(
        createNotification({
          message: `Error creating game: ${err.message}`,
          duration: -1,
          severity: Severity.ERROR,
        })
      );
      dispatch(setLoading(false));

      throw err;
    }
  };
