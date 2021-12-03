import * as Sentry from "@sentry/react";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";

import { queryClient } from "@/lib/react-query";
import { axios } from "@/lib/axios";

export function deleteProfile({ userId }: { userId: string }) {
  return axios.delete(`/v1/users/${userId}/profile`);
}

export type UseDeleteProfile = {
  userId: string;
};

export function useDeleteProfile() {
  const { user, logout } = useAuth0();

  return useMutation({
    onSuccess() {
      queryClient.invalidateQueries("profile");

      Sentry.configureScope((scope) => {
        scope.setUser(null);
      });

      logout();
    },
    mutationFn: () => {
      if (!user || !user?.sub) {
        throw new Error(
          "Unable to delete an active user that isn't logged in."
        );
      }

      return deleteProfile({ userId: user.sub });
    },
  });
}
