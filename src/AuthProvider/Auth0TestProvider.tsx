import React from "react";
import { Auth0Context } from "@auth0/auth0-react";
import { User } from "./Auth0Provider";

export type Auth = {
  user?: User;
  isAuthenticated?: boolean;
  isLoading?: boolean;
};

type AuthProviderProps = React.PropsWithChildren<Auth>;

export default function Auth0TestProvider({
  children,
  user,
  isAuthenticated,
  isLoading,
}: AuthProviderProps) {
  return (
    <Auth0Context.Provider
      // @ts-expect-error Don't warn about unimplemented funcs as this is a test provider
      value={{
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        loginWithRedirect: async () => {},
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        logout: () => {},
        user,
        isAuthenticated:
          isAuthenticated === undefined ? !!user : isAuthenticated,
        isLoading: isLoading === undefined ? !!user : isLoading,
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
}
