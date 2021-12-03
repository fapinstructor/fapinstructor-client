import { useHistory } from "react-router-dom";
import { Auth0Provider, AppState } from "@auth0/auth0-react";

import { AUTH_DOMAIN, AUTH_CLIENT_ID, AUTH_AUDIENCE } from "@/config";
import { ProfileProvider } from "@/providers/ProfileProvider";

type Auth0ProviderProps = {
  children: JSX.Element;
};

export default function AppAuth0Provider({ children }: Auth0ProviderProps) {
  const history = useHistory();

  const onRedirectCallback = (appState: AppState) => {
    history.push(appState.returnTo || window.location.pathname);
  };

  /**
   * Auth requires sessionStorage and will fail if it doesn't exist.
   * Catch the error and prevent logins instead of
   * letting the Auth0Provider blow up.
   */
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    window.sessionStorage;
  } catch (error) {
    return children;
  }

  return (
    <Auth0Provider
      domain={AUTH_DOMAIN}
      clientId={AUTH_CLIENT_ID}
      audience={AUTH_AUDIENCE}
      useRefreshTokens
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <ProfileProvider>{children}</ProfileProvider>
    </Auth0Provider>
  );
}
