import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import qs from "query-string";
import { State } from "common/store/rootReducer";
import { AppThunk } from "common/store";
import { Game } from "api/types";
import { Pagination } from "common/types/pagination";
import { createNotification, Severity } from "common/store/notifications";
import api from "common/api/client";
import {
  SearchGamesRequest,
  SearchGamesResponse,
} from "common/api/schemas/games";
import { selectProfile } from "./currentUser";
import { selectGame, setGame } from "./currentGame";

interface GamesState {
  loading: boolean;
  error?: string;
  games: Game[];
  pagination: Pagination;
}

const initialState: GamesState = {
  loading: false,
  error: undefined,
  games: [],
  pagination: {
    total: 0,
    lastPage: 0,
    perPage: 0,
    currentPage: 0,
    to: 0,
    from: 0,
  },
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setLoading: (state: GamesState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: GamesState, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setPagination: (state: GamesState, action: PayloadAction<Pagination>) => {
      state.pagination = action.payload;
    },
    setGames: (state: GamesState, action: PayloadAction<Game[]>) => {
      state.games = action.payload;
    },
    updateGame: (state: GamesState, action: PayloadAction<Game>) => {
      const { id, starred, stars } = action.payload;
      const game = state.games.find((game) => game.id === id);

      if (game) {
        game.starred = starred;
        game.stars = stars;
      }
    },
  },
});

export const selectLoading = (state: State) => state.games.loading;
export const selectError = (state: State) => state.games.error;
export const selectGames = (state: State) => state.games.games;
export const selectPagination = (state: State) => state.games.pagination;
export const selectGameById = (state: State, gameId: string) => {
  return state.games.games.find((game) => gameId === game.id);
};

export const { setError, setLoading, setGames, setPagination, updateGame } =
  gamesSlice.actions;

export default gamesSlice.reducer;

/**
 * This is one ugly function.  It needs to update both the game in the table
 * and the currentGame since they are stored as separate entities.
 * TODO: Normalize it so games are stored in one location for both.
 */
export const toggleStar =
  (gameId: string): AppThunk =>
  async (dispatch, getState) => {
    const profile = selectProfile(getState());
    if (!profile) {
      throw new Error("User profile doesn't exist");
    }

    const currentGame = selectGame(getState());
    const game = selectGameById(getState(), gameId);

    if (!currentGame && !game) {
      throw new Error("Game doesn't exist");
    }

    let stars = currentGame?.stars || game?.stars || 0;
    const starred = currentGame?.starred || game?.starred;

    if (starred) {
      await api.delete(`/v1/users/${profile.id}/games/star/${gameId}`);
      stars -= 1;
    } else {
      await api.post(`/v1/users/${profile.id}/games/star/${gameId}`);
      stars += 1;
    }

    if (currentGame) {
      dispatch(
        setGame({ ...currentGame, starred: !currentGame.starred, stars })
      );
    }
    if (game) {
      dispatch(updateGame({ ...game, starred: !game.starred, stars }));
    }
  };

export const searchGames =
  (request: SearchGamesRequest): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));

      let url;
      const queryString = qs.stringify(request, {
        arrayFormat: "comma",
      });

      if (request.playedBy) {
        url = `/v1/users/${request.playedBy}/games/history?${queryString}`;
      } else if (request.starredBy) {
        url = `/v1/users/${request.starredBy}/games/starred?${queryString}`;
      } else {
        url = `/v1/games?${queryString}`;
      }

      const { data: games } = await api.get<SearchGamesResponse>(url);

      dispatch(setPagination(games.pagination));
      dispatch(setGames(games.data));
    } catch (err) {
      const message = `Error searching games: ${err.message}`;

      dispatch(
        createNotification({
          message,
          duration: -1,
          severity: Severity.ERROR,
        })
      );

      dispatch(setError(message));
    } finally {
      dispatch(setLoading(false));
    }
  };
