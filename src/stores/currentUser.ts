import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as Sentry from "@sentry/react";

import { axios } from "@/lib/axios";
import { State } from "@/stores/rootReducer";
import { AppThunk } from "@/stores";
import { Profile } from "@/types/Profile";
import { createNotification, Severity } from "@/stores/notifications";
import { authClient } from "@/providers/AuthProvider/Auth0Provider";

interface CurrentUserState {
  loading: boolean;
  error: string | null;
  profile: Profile | null;
}

const initialState: CurrentUserState = {
  loading: false,
  error: null,
  profile: null,
};

export const currentUser = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setLoading: (state: CurrentUserState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state: CurrentUserState, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setProfile: (state: CurrentUserState, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
      state.error = null;
    },
    logout: (state: CurrentUserState) => {
      state.profile = initialState.profile;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
  },
});

export const selectLoading = (state: State) => state.currentUser.loading;
export const selectError = (state: State) => state.currentUser.error;
export const selectProfile = (state: State) => state.currentUser.profile;

export const { setLoading, setError, setProfile, logout } = currentUser.actions;

export default currentUser.reducer;

export const deleteProfile = (): AppThunk => async (dispatch, getState) => {
  const profile = selectProfile(getState());

  if (!profile) {
    throw new Error("User profile doesn't exist");
  }

  const url = `/v1/users/${profile.id}/profile`;

  try {
    dispatch(setLoading(true));

    await axios.delete(url);

    dispatch(logout());
    authClient.current?.logout();
    Sentry.configureScope((scope) => {
      scope.setUser(null);
    });
  } catch (error) {
    const message = `Error deleting profile: ${error.message}`;

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

// "Post-Redirect-Get" design pattern
export const fetchProfile =
  (userId: string): AppThunk =>
  async (dispatch) => {
    const url = `/v1/users/${userId}/profile`;

    let profile: Profile;
    try {
      try {
        // First attempt to GET the profile
        dispatch(setLoading(true));
        profile = await axios.get(url);
      } catch (error) {
        // If profile doesn't exist, attempt to create it
        if (error.response?.status === 404) {
          profile = await axios.post(url);
        } else {
          throw error;
        }
      }

      Sentry.configureScope((scope) => {
        scope.setUser({ id: profile.id });
      });

      dispatch(currentUser.actions.setProfile(profile));
    } catch (error) {
      const message = `Error fetching profile: ${error.message}`;

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

export const appendGameHistory =
  (userId: string, gameId: string): AppThunk =>
  async (dispatch, getState) => {
    const url = `/v1/users/${userId}/games/history/${gameId}`;

    try {
      await axios.put(url);
    } catch (error) {
      dispatch(
        createNotification({
          message: `Error appending game to history: ${error.message}`,
          duration: -1,
          severity: Severity.ERROR,
        })
      );
    }
  };
