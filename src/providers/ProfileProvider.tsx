import * as React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { axios } from "@/lib/axios";
import { useProfile } from "@/features/profile";
import { Profile } from "@/types/Profile";

const ProfileContext = React.createContext<Profile | undefined>(undefined);

type ProfileProviderProps = {
  children: React.ReactNode;
};

export function ProfileProvider({ children }: ProfileProviderProps) {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0();

  function getUser() {
    if (user && !isLoading && isAuthenticated) {
      return user;
    }
  }

  // If the user is authenticated then attach the token to all subsequent requests.
  React.useEffect(() => {
    const interceptor = axios.interceptors.request.use(async (config) => {
      if (user && !isLoading && isAuthenticated) {
        const token = await getAccessTokenSilently();

        config.headers.Authorization = `Bearer ${token}`;
      }

      config.headers.Accept = "application/json";

      return config;
    });

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  });

  const profileQuery = useProfile({ userId: getUser()?.sub });

  return (
    <ProfileContext.Provider value={profileQuery.data}>
      {children}
    </ProfileContext.Provider>
  );
}
