import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { State } from "@/common/store/rootReducer";
import { TIME_TO_TICK } from "@/components/organisms/BeatMeter/settings";

/**
 * @field duration Defaults to 5s.  If set to a falsy value it will show until manually dismissed
 * @field dismissible Only evaluated if a duration is set
 */
export interface Notify {
  severity?: Severity;
  message: string;
  duration?: number;
  dismissible?: boolean;
  showProgress?: boolean;
  delay?: boolean;
}

export interface Notification {
  id: number;
  severity: Severity;
  message: string;
  duration?: number;
  dismissible?: boolean;
  showProgress?: boolean;
  delay?: number;
}

export enum Severity {
  ERROR,
  INFO,
}

interface NotificationsState {
  notifications: Notification[];
}

const initialState: NotificationsState = {
  notifications: [],
};

const defaultNotification = {
  severity: Severity.INFO,
  duration: 5000,
  dismissible: false,
  showProgress: false,
};

let notificationCount = 0;

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    createNotification: {
      reducer(state, action: PayloadAction<Notification>) {
        state.notifications.push(action.payload);
      },
      prepare({ delay, ...notify }: Notify) {
        const notification = {
          id: notificationCount++,
          delay: delay ? TIME_TO_TICK : 0,
          ...defaultNotification,
          ...notify,
        };
        return { payload: notification };
      },
    },
    dismissNotification: (state, action: PayloadAction<number>) => {
      const index = state.notifications.findIndex(
        (notification) => notification.id === action.payload
      );

      if (index > -1) {
        state.notifications.splice(index, 1);
      }
    },
    dismissAllNotifications: (state) => {
      state.notifications = initialState.notifications;
    },
  },
});

export const selectNotifications = (state: State) =>
  state.notifications.notifications;

export const {
  createNotification,
  dismissNotification,
  dismissAllNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
