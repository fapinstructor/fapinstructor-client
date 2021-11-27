import { QueryClient, QueryCache } from "react-query";

import { createNotification } from "@/game/engine/notification";
import { Severity } from "@/stores/notifications";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      /**
       * Only show error toasts if we already have data in the cache
       * which indicates a failed background update
       */
      if (query.state.data !== undefined) {
        let message: string;

        if (error instanceof Error) {
          message = `Something went wrong: ${error.message}`;
        } else {
          message = "An unexpected error has occurred!";
        }

        createNotification({
          message,
          duration: -1,
          severity: Severity.ERROR,
        });
      }
    },
  }),
});
