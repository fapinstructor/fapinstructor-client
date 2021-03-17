import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "common/store/rootReducer";
import api from "common/api/client";
import { AppThunk } from "common/store";
import Game from "common/types/Game";
import { createNotification, Severity } from "common/store/notifications";
import { validSubreddit } from "utils/regex";
import { StrokeStyleString } from "game/enums/StrokeStyle";

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

export const fetchGame = (gameId: string): AppThunk => async (dispatch) => {
  const url = `/v1/games/${gameId}`;

  try {
    dispatch(setPending());

    const res = await api.get(url);
    const game = res.data;

    /**
     * Configs currently store the default stroke style as an index,
     * but we now use a typescript union. This will convert it to
     * the correct type.
     */
    if (typeof game.config.defaultStrokeStyle === "number") {
      game.config.defaultStrokeStyle =
        StrokeStyleString[game.config.defaultStrokeStyle] ?? "dominant";
    }

    /**
     * Older games were created before subreddit validation.
     * We want to remove any invalid subreddits stored in the config before calling
     * the /v1/reddit endpoint.
     */
    const subreddits = game.config.redditId
      .split(",")
      .map((v: string) => v.trim());

    const validSubreddits = subreddits.filter((subreddit: string) =>
      validSubreddit.test(subreddit)
    );

    if (subreddits.length !== validSubreddits.length) {
      dispatch(
        createNotification({
          message: `Detected invalid subreddits for this game.`,
          severity: Severity.ERROR,
          dismissible: true,
        })
      );
      game.config.redditId = validSubreddits.join(",");
    }

    if (game.config.redditId.length === 0) {
      dispatch(setError("We were unable to repair this game"));
    } else {
      dispatch(setGame(game));
    }
  } catch (err) {
    if (err.response.status === 404) {
      dispatch(setError("We were unable to find the game"));
    } else {
      dispatch(
        createNotification({
          message: `Error fetching game: ${err.message}`,
          duration: -1,
          severity: Severity.ERROR,
        })
      );
    }
  }
};
