import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "common/store/rootReducer";
import api from "common/api/client";
import { AppThunk } from "common/store";
import Game from "common/types/Game";
import { createNotification, Severity } from "common/store/notifications";

type StateType = "idle" | "pending" | "resolved" | "rejected";

interface CurrentGameState {
  state: StateType;
  error: string | null;
  game: Game | null;
}

const initialState: CurrentGameState = {
  state: "idle",
  error: null,
  game: null,
};

export const currentGameSlice = createSlice({
  name: "currentGame",
  initialState,
  reducers: {
    setPending: (state: CurrentGameState) => {
      state.state = "pending";
      state.error = null;
    },
    setError: (state: CurrentGameState, action: PayloadAction<string>) => {
      state.state = "rejected";
      state.error = action.payload;
    },
    setGame: (state: CurrentGameState, action: PayloadAction<Game>) => {
      state.state = "resolved";
      state.game = action.payload;
    },
  },
});

export const selectLoading = (state: State) =>
  state.currentGame.state === "idle" || state.currentGame.state === "pending";
export const selectError = (state: State) => state.currentGame.error;
export const selectGame = (state: State) => state.currentGame.game;

export const { setPending, setError, setGame } = currentGameSlice.actions;

export default currentGameSlice.reducer;

export const fetchGame =
  (gameId: string): AppThunk =>
  async (dispatch) => {
    const url = `/v1/games/${gameId}`;

    try {
      dispatch(setPending());

      const res = await api.get(url);
      const game = res.data;

      dispatch(setGame(game));
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setError("We were unable to find the game"));
      } else {
        dispatch(
          createNotification({
            message: `Error fetching game: ${error.message}`,
            duration: -1,
            severity: Severity.ERROR,
          })
        );
      }
    }
  };
