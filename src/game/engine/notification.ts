/**
 * Transitioning to new notification system, this file has been turned
 * into an adapter
 */
import store from "@/stores";
import {
  createNotification as createNotification2,
  dismissNotification as dismissNotification2,
  dismissAllNotifications as dismissAllNotifications2,
} from "@/stores/notifications";

export const createNotification = (
  ...args: Parameters<typeof createNotification2>
) => store.dispatch(createNotification2(...args)).payload.id;

export const dismissNotification = (
  ...args: Parameters<typeof dismissNotification2>
) => store.dispatch(dismissNotification2(...args));

export const dismissAllNotifications = () =>
  store.dispatch(dismissAllNotifications2());
