import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import api from "@/common/api/client";
import { State } from "@/common/store/rootReducer";
import { AppThunk } from "@/common/store";
import { createNotification, Severity } from "@/common/store/notifications";

interface CurrentTagState {
  isLoading: boolean;
  tags: string[];
}

const initialState: CurrentTagState = {
  isLoading: false,
  tags: [],
};

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setLoading: (state: CurrentTagState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setTags: (state: CurrentTagState, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
      state.isLoading = false;
    },
  },
});

export const selectLoading = (state: State) => state.tags.isLoading;
export const selectTags = (state: State) => state.tags.tags;

const { setLoading, setTags } = tagsSlice.actions;

export default tagsSlice.reducer;

export const fetchTags = (): AppThunk => async (dispatch) => {
  const url = `/v1/tags`;

  try {
    dispatch(setLoading(true));
    const res = await api.get(url);
    dispatch(setTags(res.data));
  } catch (error) {
    dispatch(
      createNotification({
        message: `Error fetching tags: ${error.message}`,
        duration: -1,
        severity: Severity.ERROR,
      })
    );
    dispatch(setLoading(false));
  }
};
